export async function onRequest(context) {
  const { request, env, params } = context;

  // 获取 URL 路径数组 (例如访问 /avatar/user1.png，params.path 就是 ['avatar', 'user1.png'])
  const pathArray = params.path;

  // 决定使用哪个存储桶，以及最终查询的文件路径
  let targetBucket;
  let imagePath;

  // 逻辑判断：根据 URL 路径的第一段来区分
  if (pathArray[0] === 'avatar') {
    // 使用方括号语法读取带连字符的变量
    targetBucket = env['CUSTOM-AVATAR'];

    // 去掉开头的 'avatar'，剩下的部分作为 R2 里的文件名
    // 例如 /avatar/icon.png -> 实际去 R2 查询的文件名是 'icon.png'
    imagePath = pathArray.slice(1).join('/');
  } else {
    // 默认走 chicago-assets 存储桶
    targetBucket = env.MY_BUCKET;
    imagePath = pathArray.join('/');
  }

  // 从动态确定的 R2 存储桶获取对象
  const object = await targetBucket.get(imagePath);

  if (object === null) {
    return new Response('Image Not Found', { status: 404 });
  }

  // 设置响应头，保留图片的原始元数据
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);

  // 可选：添加缓存控制，让浏览器缓存图片，减少 R2 读取次数
  headers.set('Cache-Control', 'public, max-age=31536000');

  // 解决跨域问题（如果前端 Vue/React 和这个接口不在同一个域名下，建议加上）
  // headers.set('Access-Control-Allow-Origin', '*');

  // 返回图片流
  return new Response(object.body, { headers });
}