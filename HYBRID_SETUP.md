# 🔄 UNION HP Hybrid Mode Setup Guide

## 🎯 Overview

UNION HP now supports **hybrid mode** - the best of both worlds! This mode combines:
- **Notion** for content management (better UX, collaboration)
- **Supabase** for authentication and performance-critical features

## 🚀 Quick Start

### Step 1: Run Setup Script
```bash
node scripts/setup-notion.js
```

This will show you detailed setup instructions.

### Step 2: Create Notion Integration
1. Go to https://www.notion.so/my-integrations
2. Create "UNION HP CMS" integration
3. Copy the integration token

### Step 3: Create Databases
Create these databases in Notion with the specified properties:

#### News Database
- Title (title)
- Content (rich_text)
- Excerpt (rich_text)
- Category (select): general, announcement, event, press
- Status (select): draft, published, archived
- Tags (multi_select)
- Featured Image (files)
- Published At (date)

#### Events Database
- Title (title)
- Description (rich_text)
- Event Date (date)
- Time (rich_text)
- Location (rich_text)
- Category (select): workshop, conference, meetup, seminar
- Status (select): upcoming, ongoing, completed, cancelled
- Max Participants (number)
- Current Participants (number)
- Registration Required (checkbox)
- Featured Image (files)

#### Board Posts Database
- Title (title)
- Content (rich_text)
- Author (rich_text)
- Category (select): お知らせ, 活動報告, 質問, その他
- Status (select): draft, published, archived
- Tags (multi_select)
- Is Pinned (checkbox)
- Featured Image (files)

#### Organizations Database
- Name (title)
- Description (rich_text)
- Type (select): student_group, university, company, npo
- Status (select): active, inactive, pending
- Member Count (number)
- Location (rich_text)
- Website (url)
- Contact Email (email)
- Logo (files)
- Joined Date (date)

#### Partners Database
- Name (title)
- Description (rich_text)
- Partnership Level (select): basic, silver, gold, platinum
- Status (select): active, inactive, pending
- Website (url)
- Contact Email (email)
- Logo (files)
- Partnership Date (date)

#### Members Database
- Name (title)
- Role (rich_text)
- Category (select): core, staff, advisor, volunteer
- Email (email)
- University (rich_text)
- Position (rich_text)
- Status (select): active, inactive, alumni
- Avatar (files)
- Join Date (date)
- Is Representative (checkbox)

#### Supporters Database
- Name (title)
- Email (email)
- Organization (rich_text)
- Support Type (select): financial, mentorship, partnership, volunteer
- Status (select): active, inactive, pending
- Amount (number)
- Message (rich_text)

### Step 4: Share Databases
For each database:
1. Click "Share" button
2. Add "UNION HP CMS" integration
3. Grant access

### Step 5: Get Database IDs
For each database:
1. Open database page
2. Copy URL
3. Extract 32-character ID from URL

### Step 6: Update Environment Variables
Add to `.env.local`:

```env
# Notion Configuration
NOTION_TOKEN=your_integration_token
NOTION_NEWS_DB_ID=your_news_database_id
NOTION_EVENTS_DB_ID=your_events_database_id
NOTION_BOARD_DB_ID=your_board_database_id
NOTION_ORGANIZATIONS_DB_ID=your_organizations_database_id
NOTION_PARTNERS_DB_ID=your_partners_database_id
NOTION_MEMBERS_DB_ID=your_members_database_id
NOTION_SUPPORTERS_DB_ID=your_supporters_database_id

# Enable hybrid mode
NEXT_PUBLIC_USE_NOTION_FOR_CONTENT=true
NEXT_PUBLIC_CMS_MODE=hybrid
```

### Step 7: Test Setup
```bash
pnpm dev
```

Go to admin settings and check the CMS Configuration card.

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NOTION_TOKEN` | Notion integration token | Yes |
| `NOTION_*_DB_ID` | Database IDs for each content type | Optional* |
| `NEXT_PUBLIC_USE_NOTION_FOR_CONTENT` | Enable Notion for content | Yes |
| `NEXT_PUBLIC_CMS_MODE` | Set to 'hybrid' | Yes |

*If a database ID is not provided, that content type will use Supabase

### Modes

| Mode | Description | Use Case |
|------|-------------|----------|
| `supabase` | All data in Supabase | High performance, existing setup |
| `hybrid` | Content in Notion, auth in Supabase | Best of both worlds (recommended) |
| `notion` | All content in Notion | Full collaboration mode |

## 🎯 What Changes in Hybrid Mode

### ✅ Uses Notion
- News management
- Event management  
- Board posts
- Organization directory
- Partner management
- Member management
- Supporter management

### ✅ Stays in Supabase
- User authentication
- Admin roles and permissions
- Real-time analytics
- System settings
- Page views and stats

## 💡 Benefits

### For Content Managers
- Rich text editing in Notion
- Collaborative editing
- Mobile app access
- Better organization with tags/categories
- Templates and workflows

### For Developers
- Same API interface
- Gradual migration possible
- Performance optimized (auth stays fast)
- Easy rollback capability

## 🔄 Migration Strategy

### Phase 1: Setup (Now)
- Install Notion integration
- Configure environment variables
- Test with one content type

### Phase 2: Content Migration (Optional)
- Export existing Supabase data
- Import to Notion databases
- Verify data integrity

### Phase 3: Team Training
- Train content managers on Notion
- Set up workflows and templates
- Establish content guidelines

## 🚨 Troubleshooting

### Common Issues

1. **"Database not found" error**
   - Check database ID is correct
   - Ensure integration has access to database
   - Verify database exists and is shared

2. **"Unauthorized" error**
   - Check NOTION_TOKEN is correct
   - Ensure integration token has proper permissions
   - Regenerate token if needed

3. **Slow responses**
   - Normal for Notion API (300-1000ms)
   - Consider caching for high-traffic sites
   - Use pagination for large datasets

4. **Content not syncing**
   - Check environment variables
   - Restart development server
   - Verify database schema matches expectations

### Rollback to Supabase Only

Set in `.env.local`:
```env
NEXT_PUBLIC_USE_NOTION_FOR_CONTENT=false
NEXT_PUBLIC_CMS_MODE=supabase
```

Restart the application.

## 📊 Performance Considerations

| Feature | Supabase | Notion | Recommendation |
|---------|----------|--------|----------------|
| API Response | 50-200ms | 300-1000ms | Use caching for Notion |
| Real-time | Excellent | Limited | Keep real-time in Supabase |
| Complex queries | Excellent | Limited | Use Supabase for analytics |
| Collaboration | Basic | Excellent | Use Notion for content |

## 🔐 Security

- Notion integration token should be kept secure
- Database sharing should be limited to necessary integrations
- Authentication remains in Supabase (more secure)
- Admin permissions are still enforced

## 📈 Next Steps

1. **Start with News** - Enable Notion for news management first
2. **Train Team** - Get content managers familiar with Notion
3. **Add More Content Types** - Gradually enable for events, board posts, etc.
4. **Optimize** - Add caching and performance improvements
5. **Advanced Features** - Explore Notion templates and automation

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section
2. Review environment variables
3. Test with a single database first
4. Check Notion integration permissions

---

🎉 **Congratulations!** You now have a hybrid CMS that combines the power of Supabase with the collaboration features of Notion!