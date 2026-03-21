export const sendHtml = (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.send(stringHTML)
}

const stringHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Admin APIs</title>

<meta name="description" content="Admin APIs dashboard with endpoints, fast access and clean UI">


<meta property="og:title" content="Admin APIs">
<meta property="og:description" content="Clean dashboard for managing and accessing admin APIs">
<meta property="og:image" content="https://dooey.org/wp-content/uploads/2021/01/Kubernetes-Administrator-Course.png">
<meta property="og:url" content="https://yourdomain.com">
<meta property="og:type" content="website">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Admin APIs">
<meta name="twitter:description" content="Clean dashboard for managing admin APIs">
<meta name="twitter:image" content="https://dooey.org/wp-content/uploads/2021/01/Kubernetes-Administrator-Course.png">


<meta name="theme-color" content="#0f172a">
<link rel="icon" href="https://dooey.org/wp-content/uploads/2021/01/Kubernetes-Administrator-Course.png">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;font-family:Inter}
body{background:#0f172a;color:#e2e8f0}
.container{max-width:1100px;margin:auto;padding:40px}
.header{display:flex;justify-content:space-between;align-items:center;margin-bottom:40px}
.logo{font-size:22px;font-weight:600;color:#38bdf8}
.card{background:#1e293b;border-radius:16px;padding:24px;margin-bottom:20px;transition:.3s}
.card:hover{transform:translateY(-4px);box-shadow:0 10px 25px rgba(0,0,0,.3)}
.title{font-size:20px;margin-bottom:10px;color:#38bdf8}
.desc{font-size:14px;color:#94a3b8;margin-bottom:15px}
.endpoint{background:#020617;padding:10px;border-radius:8px;font-size:13px;color:#22c55e}
.footer{text-align:center;margin-top:40px;font-size:13px;color:#64748b}
.badge{background:#22c55e;color:#020617;padding:4px 10px;border-radius:6px;font-size:12px;margin-left:10px}
</style>
</head>
<body>
<div class="container">
<div class="header">
<div class="logo">Admin APIs</div>
<div class="badge">v1.0</div>
</div>

<div class="card">
<div class="title">Authentication</div>
<div class="desc">Admin login and session management</div>
<div class="endpoint">POST /api/admin/login</div>
</div>

<div class="card">
<div class="title">Users</div>
<div class="desc">Manage platform users</div>
<div class="endpoint">GET /api/admin/users</div>
</div>

<div class="card">
<div class="title">Analytics</div>
<div class="desc">Fetch system analytics data</div>
<div class="endpoint">GET /api/admin/analytics</div>
</div>

<div class="card">
<div class="title">Settings</div>
<div class="desc">Update admin configurations</div>
<div class="endpoint">PUT /api/admin/settings</div>
</div>

<div class="footer">Admin API Documentation • Secure Access Only</div>
</div>
</body>
</html>`;
