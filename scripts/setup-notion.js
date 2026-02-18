#!/usr/bin/env node

/**
 * Notion Database Setup Script for UNION HP Hybrid Mode
 * This script helps you set up Notion databases for content management
 */

console.log('🔧 UNION HP - Notion Hybrid Setup Guide')
console.log('=====================================\n')

console.log('📋 Step 1: Create Notion Integration')
console.log('1. Go to https://www.notion.so/my-integrations')
console.log('2. Click "New integration"')
console.log('3. Name: "UNION HP CMS"')
console.log('4. Workspace: Select your UNION workspace')
console.log('5. Copy the Internal Integration Token\n')

console.log('📊 Step 2: Create Notion Databases')
console.log('Create the following databases in your Notion workspace:\n')

const databases = [
  {
    name: 'News',
    properties: [
      'Title (title)',
      'Content (rich_text)', 
      'Excerpt (rich_text)',
      'Category (select): general, announcement, event, press',
      'Status (select): draft, published, archived',
      'Tags (multi_select)',
      'Featured Image (files)',
      'Published At (date)',
      'Created At (created_time)',
      'Updated At (last_edited_time)'
    ]
  },
  {
    name: 'Events', 
    properties: [
      'Title (title)',
      'Description (rich_text)',
      'Event Date (date)',
      'Time (rich_text)',
      'Location (rich_text)',
      'Category (select): workshop, conference, meetup, seminar',
      'Status (select): upcoming, ongoing, completed, cancelled',
      'Max Participants (number)',
      'Current Participants (number)',
      'Registration Required (checkbox)',
      'Featured Image (files)',
      'Created At (created_time)',
      'Updated At (last_edited_time)'
    ]
  },
  {
    name: 'Board Posts',
    properties: [
      'Title (title)',
      'Content (rich_text)',
      'Author (rich_text)',
      'Category (select): お知らせ, 活動報告, 質問, その他',
      'Status (select): draft, published, archived',
      'Tags (multi_select)',
      'Is Pinned (checkbox)',
      'Featured Image (files)',
      'Created At (created_time)',
      'Updated At (last_edited_time)'
    ]
  },
  {
    name: 'Organizations',
    properties: [
      'Name (title)',
      'Description (rich_text)',
      'Type (select): student_group, university, company, npo',
      'Status (select): active, inactive, pending',
      'Member Count (number)',
      'Location (rich_text)',
      'Website (url)',
      'Contact Email (email)',
      'Logo (files)',
      'Joined Date (date)',
      'Created At (created_time)',
      'Updated At (last_edited_time)'
    ]
  },
  {
    name: 'Partners',
    properties: [
      'Name (title)',
      'Description (rich_text)',
      'Partnership Level (select): basic, silver, gold, platinum',
      'Status (select): active, inactive, pending',
      'Website (url)',
      'Contact Email (email)',
      'Logo (files)',
      'Partnership Date (date)',
      'Created At (created_time)',
      'Updated At (last_edited_time)'
    ]
  },
  {
    name: 'Members',
    properties: [
      'Name (title)',
      'Role (rich_text)',
      'Category (select): core, staff, advisor, volunteer',
      'Email (email)',
      'University (rich_text)',
      'Position (rich_text)',
      'Status (select): active, inactive, alumni',
      'Avatar (files)',
      'Join Date (date)',
      'Is Representative (checkbox)',
      'Created At (created_time)',
      'Updated At (last_edited_time)'
    ]
  },
  {
    name: 'Supporters',
    properties: [
      'Name (title)',
      'Email (email)',
      'Organization (rich_text)',
      'Support Type (select): financial, mentorship, partnership, volunteer',
      'Status (select): active, inactive, pending',
      'Amount (number)',
      'Message (rich_text)',
      'Created At (created_time)',
      'Updated At (last_edited_time)'
    ]
  }
]

databases.forEach((db, index) => {
  console.log(`${index + 1}. ${db.name} Database:`)
  db.properties.forEach(prop => {
    console.log(`   • ${prop}`)
  })
  console.log('')
})

console.log('📝 Step 3: Share Databases with Integration')
console.log('For each database created:')
console.log('1. Click "Share" in the top-right corner')
console.log('2. Search for "UNION HP CMS" integration')
console.log('3. Click "Invite" to give access\n')

console.log('🔗 Step 4: Get Database IDs')
console.log('For each database:')
console.log('1. Open the database page')
console.log('2. Copy the URL')
console.log('3. Extract the database ID (32-character string after the last slash)')
console.log('   Example: https://notion.so/your-workspace/abc123...xyz789')
console.log('   Database ID: abc123...xyz789\n')

console.log('⚙️  Step 5: Update Environment Variables')
console.log('Add these to your .env.local file:')
console.log('')
console.log('NOTION_TOKEN=your_integration_token_here')
console.log('NOTION_NEWS_DB_ID=your_news_database_id')
console.log('NOTION_EVENTS_DB_ID=your_events_database_id')
console.log('NOTION_BOARD_DB_ID=your_board_database_id')
console.log('NOTION_ORGANIZATIONS_DB_ID=your_organizations_database_id')
console.log('NOTION_PARTNERS_DB_ID=your_partners_database_id')
console.log('NOTION_MEMBERS_DB_ID=your_members_database_id')
console.log('NOTION_SUPPORTERS_DB_ID=your_supporters_database_id')
console.log('')
console.log('# Enable hybrid mode')
console.log('NEXT_PUBLIC_USE_NOTION_FOR_CONTENT=true')
console.log('NEXT_PUBLIC_CMS_MODE=hybrid\n')

console.log('🚀 Step 6: Test the Setup')
console.log('1. Restart your development server: pnpm dev')
console.log('2. Go to admin dashboard')
console.log('3. Try creating/editing content')
console.log('4. Check if data appears in Notion databases\n')

console.log('💡 Tips:')
console.log('• Start with just News database for testing')
console.log('• You can mix Notion and Supabase (some content in each)')
console.log('• Set NEXT_PUBLIC_USE_NOTION_FOR_CONTENT=false to revert to Supabase')
console.log('• Authentication and analytics remain on Supabase for performance\n')

console.log('✅ Setup complete! Your UNION HP now supports hybrid Notion+Supabase mode.')