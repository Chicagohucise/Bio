export async function onRequest(context) {
  const { env, params } = context;

  // params.path 就是头像的文件名数组，比如遇到 /api/avatar/Kuno.jpg，这里就是 ['Kuno.jpg']
  const imagePath = params.path.join('/');

  // 直接去头像桶里拿数据
  const object = await env['CUSTOM-AVATAR'].get(imagePath);

  if (object === null) {
    return new Response('Avatar Not Found', { status: 404 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);
  headers.set('Cache-Control', 'public, max-age=31536000');

  return new Response(object.body, { headers });
}