// 奇思妙想 - 云同步 Worker
// KV namespace: SYNC_KV
// 通过 X-Sync-Key 请求头验证身份

const KV_KEY = 'ideas'

export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Sync-Key',
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders })
    }

    // 验证同步密钥
    const syncKey = request.headers.get('X-Sync-Key')
    if (!syncKey) {
      return new Response(JSON.stringify({ error: '缺少 X-Sync-Key' }), {
        status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders }
      })
    }

    // 获取存储的数据
    const stored = await env.SYNC_KV.get(KV_KEY + '_' + syncKey)

    if (request.method === 'GET') {
      // 下载
      const data = stored ? JSON.parse(stored) : []
      return new Response(JSON.stringify({ ideas: data }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      })
    }

    if (request.method === 'POST') {
      // 上传
      const body = await request.json()
      if (!Array.isArray(body.ideas)) {
        return new Response(JSON.stringify({ error: '数据格式错误' }), {
          status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders }
        })
      }
      await env.SYNC_KV.put(KV_KEY + '_' + syncKey, JSON.stringify(body.ideas))
      return new Response(JSON.stringify({ ok: true, count: body.ideas.length }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      })
    }

    return new Response('Method not allowed', { status: 405, headers: corsHeaders })
  }
}
