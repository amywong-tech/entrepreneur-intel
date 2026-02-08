// EmailJS 邮件推送配置
// 已配置完成，可以直接使用

const EMAIL_CONFIG = {
  serviceId: 'service_fnxyx4v',
  templateId: 'template_gqnx2wy',
  publicKey: 'E3st81SuekulQ8VAV'
};

// 初始化 EmailJS
(function() {
  emailjs.init(EMAIL_CONFIG.publicKey);
})();

// 发送每日邮件
async function sendDailyEmail(items, toEmail = 'amy@cozmox.com') {
  try {
    const date = new Date().toLocaleDateString('zh-CN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    const htmlContent = generateEmailHTML(items, date);
    
    const result = await emailjs.send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.templateId,
      {
        to_email: toEmail,
        date: date,
        html_content: htmlContent
      }
    );
    
    console.log('✅ 邮件发送成功:', result);
    return { success: true, message: '邮件发送成功！' };
    
  } catch (error) {
    console.error('❌ 邮件发送失败:', error);
    return { success: false, message: '邮件发送失败: ' + error.text };
  }
}

// 生成邮件HTML内容
function generateEmailHTML(items, date) {
  const itemsHTML = items.slice(0, 5).map((item, idx) => `
    <div style="margin-bottom: 24px; padding: 20px; background: #f9f9f9; border-radius: 8px;">
      <div style="color: #666; font-size: 12px; margin-bottom: 8px;">
        ${getCategoryLabel(item.category)}
      </div>
      <h3 style="margin: 0 0 8px 0; font-size: 18px; color: #000;">
        ${idx + 1}. ${item.title}
      </h3>
      <p style="margin: 0 0 12px 0; color: #333; font-size: 14px;">
        <strong>核心：</strong>${item.summary}
      </p>
      <div style="font-size: 13px; color: #555; line-height: 1.6;">
        <strong>创业建议：</strong>
        <ul style="margin: 8px 0; padding-left: 20px;">
          ${item.actions.map(a => `<li>${a}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');

  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f5f7;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #000;">
            <h1 style="margin: 0; font-size: 24px;">📊 创业者情报</h1>
            <p style="margin: 8px 0 0 0; color: #666; font-size: 14px;">${date}</p>
        </div>
        
        <div style="padding: 24px 0;">
            <div style="background: #000; color: #fff; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
                <h2 style="margin: 0 0 8px 0; font-size: 16px; opacity: 0.8;">今日核心洞察</h2>
                <p style="margin: 0; font-size: 15px; line-height: 1.6;">
                    AI行业持续创新，政策红利释放，科技股表现强劲。建议关注AI应用落地机会，评估业务AI化可能性。
                </p>
            </div>

            <h2 style="font-size: 18px; margin-bottom: 16px; color: #000;">今日精选 Top 5</h2>
            ${itemsHTML}
        </div>

        <div style="text-align: center; padding: 20px 0; border-top: 1px solid #e5e5e5; color: #999; font-size: 12px;">
            <p>创业者情报中心 © 2026</p>
            <p style="margin-top: 8px;">
                <a href="https://entrepreneur-intel.vercel.app" style="color: #000; text-decoration: none; font-weight: 600;">访问完整版网站</a>
            </p>
        </div>
    </div>
</body>
</html>
  `;
}
