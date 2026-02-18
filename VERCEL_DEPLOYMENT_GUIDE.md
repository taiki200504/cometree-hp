# 🚀 UNION HP Vercel Production Deployment Guide

## Prerequisites Checklist

- [ ] Vercel account created
- [ ] New Supabase project created
- [ ] Resend API key obtained (for email)
- [ ] Google Analytics 4 property created
- [ ] Sentry account set up

## Step 1: Create New Supabase Project

1. Go to [Supabase](https://supabase.com)
2. Create new organization/project
3. Copy project URL and API keys
4. Note down the values for environment variables

## Step 2: Deploy to Vercel

### Option A: Manual Deployment (Recommended)

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "Add New" → "Project"**
3. **Import your repository**
4. **Configure build settings:**
   - Framework: Next.js
   - Build Command: `pnpm build`
   - Install Command: `pnpm install`
   - Root Directory: `./`

5. **Add Environment Variables:**

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token

# Email Service
RESEND_API_KEY=your_resend_api_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
NEXT_PUBLIC_SITE_NAME=UNION
NEXT_PUBLIC_SITE_DESCRIPTION=UNION公式サイト

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_measurement_id
NEXT_PUBLIC_GA4_PROPERTY_ID=your_ga4_property_id

# Google Search Console
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_verification_code

# Monitoring
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
SENTRY_AUTH_TOKEN=your_sentry_auth_token

# Production Flags
NODE_ENV=production
NEXT_PUBLIC_ENABLE_SENTRY=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

6. **Click "Deploy"**

### Option B: CLI Deployment

```bash
# Install latest Vercel CLI
npm i -g vercel@latest

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

## Step 3: Database Migration

Execute these SQL files in order in Supabase SQL Editor:

1. `001_initial_schema.sql`
2. `002_board_posts_integration.sql`
3. `003_members_management.sql`
4. `004_supporters_management.sql`
5. `005_organizations_enhancement.sql`
6. `006_organization_members.sql`
7. `007_admin_users.sql`
8. `008_organization_news.sql`
9. `009_podcast_management.sql`
10. `010_organization_content.sql`
11. `011_organization_content.sql`
12. `012_add_visibility_to_org_content.sql`
13. `013_system_settings.sql`
14. `014_org_content_visibility_policies.sql`
15. `015_organization_extras.sql`

## Step 4: Create Admin User

### Option A: Manual (Supabase Dashboard)

1. Go to Supabase → Authentication → Users
2. Add user with email: `gakusei.union266@gmail.com`
3. Run SQL to grant admin role:

```sql
INSERT INTO public.users (id, email, full_name, role)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'gakusei.union266@gmail.com'),
  'gakusei.union266@gmail.com',
  'UNION Administrator',
  'admin'
) ON CONFLICT (id) DO UPDATE SET role = 'admin';
```

### Option B: Script (After fixing Supabase URL)

```bash
node scripts/create-admin.js
```

## Step 5: Configure Storage

1. Go to Supabase → Storage
2. Create bucket named `images`
3. Set bucket to public
4. Configure policies:

```sql
-- Allow public viewing
CREATE POLICY "Allow public viewing" ON storage.objects
FOR SELECT USING (bucket_id = 'images');

-- Allow authenticated uploads
CREATE POLICY "Allow authenticated uploads" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');
```

## Step 6: Post-Deployment Verification

### ✅ Basic Functionality
- [ ] Homepage loads correctly
- [ ] Admin login works (`/admin/login`)
- [ ] Admin dashboard accessible
- [ ] Image upload functional
- [ ] Database operations work

### ✅ Performance
- [ ] Page load times < 3 seconds
- [ ] Images load properly
- [ ] Mobile responsiveness
- [ ] SEO meta tags present

### ✅ Security
- [ ] HTTPS enabled
- [ ] Admin routes protected
- [ ] Environment variables secured
- [ ] Database RLS policies active

### ✅ Monitoring
- [ ] Sentry error tracking active
- [ ] Google Analytics tracking
- [ ] Vercel analytics enabled

## Step 7: Domain Configuration (Optional)

1. In Vercel Dashboard → Project → Settings → Domains
2. Add your custom domain
3. Configure DNS records
4. Update `NEXT_PUBLIC_SITE_URL` environment variable

## Step 8: Production Optimizations

### Performance
- [ ] Enable Vercel Speed Insights
- [ ] Configure image optimization
- [ ] Set up proper caching headers

### Security
- [ ] Change default admin password
- [ ] Review RLS policies
- [ ] Set up monitoring alerts

### Monitoring
- [ ] Configure Sentry alerts
- [ ] Set up uptime monitoring
- [ ] Enable error notifications

## Troubleshooting

### Common Issues

1. **Build Fails**
   - Check environment variables
   - Verify Node.js version compatibility
   - Check for TypeScript errors

2. **Database Connection Issues**
   - Verify Supabase URL and keys
   - Check network connectivity
   - Ensure RLS policies are correct

3. **Authentication Problems**
   - Verify Supabase Auth configuration
   - Check admin user creation
   - Ensure proper role assignment

### Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)

## Final Checklist

- [ ] Vercel deployment successful
- [ ] Database migrations complete
- [ ] Admin user created
- [ ] Storage configured
- [ ] All environment variables set
- [ ] Basic functionality verified
- [ ] Security measures in place
- [ ] Monitoring systems active
- [ ] Domain configured (if applicable)
- [ ] Performance optimized

🎉 **Congratulations! Your UNION HP is now live in production!**

## Important Notes

1. **Change the default admin password immediately**
2. **Review and update all API keys for production**
3. **Set up regular backups**
4. **Monitor error logs regularly**
5. **Keep dependencies updated**

---

**Last Updated**: December 2024
**Version**: v1.0