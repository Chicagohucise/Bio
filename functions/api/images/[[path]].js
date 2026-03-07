export async function onRequest(context) {
  const { request, env, params } = context;

  // 获取请求的图片路径
  const imagePath = params.path.join('/');

  // 从 R2 存储桶获取对象
  const object = await env.MY_BUCKET.get(imagePath);

  if (object === null) {
    return new Response('Image Not Found', { status: 404 });
  }

  // 设置响应头，保留图片的原始元数据
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);

  // 可选：添加缓存控制，让浏览器缓存图片，减少 R2 读取次数
  headers.set('Cache-Control', 'public, max-age=31536000');

  // 返回图片流
  return new Response(object.body, { headers });
}