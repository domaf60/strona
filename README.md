# ndes1gn Portfolio

Modern portfolio website with client panel, authentication, and multi-language support.

## 🚀 Deployment with Docker

### Prerequisites
- Docker and Docker Compose installed
- Port 8086 available
- Cloudflare configured (optional)

### Quick Start

1. **Clone and navigate to project directory**
```bash
cd /path/to/project
```

2. **Build and run with Docker Compose**
```bash
docker-compose up -d
```

3. **Or build and run manually**
```bash
# Build the image
docker build -t ndesign-portfolio .

# Run the container
docker run -d -p 8086:8086 --name ndesign-portfolio ndesign-portfolio
```

### Access the Application
- **Local**: http://localhost:8086
- **Production**: Configure your domain in Cloudflare

### Docker Commands

```bash
# View logs
docker-compose logs -f

# Stop the application
docker-compose down

# Rebuild and restart
docker-compose up -d --build

# Remove everything
docker-compose down -v
```

### Cloudflare Configuration

1. **DNS Settings**
   - Add an A record pointing to your server IP
   - Or use a CNAME if proxying through Cloudflare

2. **SSL/TLS Settings**
   - Set to "Full" or "Full (strict)" mode
   - Enable "Always Use HTTPS"

3. **Page Rules** (optional)
   - Cache Level: Standard
   - Browser Cache TTL: Respect Existing Headers

4. **Firewall** (optional)
   - Enable Bot Fight Mode
   - Configure rate limiting if needed

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Environment Variables

Create a `.env` file with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🌍 Features

- ✅ Multi-language support (PL/EN)
- ✅ Client authentication panel
- ✅ Project management
- ✅ Contact form
- ✅ Reviews system
- ✅ Responsive design
- ✅ SEO optimized
- ✅ PWA ready

## 📱 Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Supabase (Database + Auth)
- Docker + Nginx
