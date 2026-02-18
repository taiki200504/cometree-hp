# 📋 Notion Database Property Setup Guide

## News Database Properties

### Required Properties (in this exact order):

1. **Title** (Title)
   - Type: Title
   - Name: "Title"
   - Description: "News article title"

2. **Content** (Text)
   - Type: Text
   - Name: "Content"
   - Description: "Full article content"

3. **Excerpt** (Text)
   - Type: Text
   - Name: "Excerpt" 
   - Description: "Brief summary or preview"

4. **Category** (Select)
   - Type: Select
   - Name: "Category"
   - Options:
     - general (default)
     - announcement
     - event
     - press

5. **Status** (Select)
   - Type: Select
   - Name: "Status"
   - Options:
     - draft (default)
     - published
     - archived

6. **Tags** (Multi-select)
   - Type: Multi-select
   - Name: "Tags"
   - Description: "Article tags"

7. **Featured Image** (Files & media)
   - Type: Files & media
   - Name: "Featured Image"
   - Description: "Main article image"

8. **Published At** (Date)
   - Type: Date
   - Name: "Published At"
   - Include time: Yes

## Events Database Properties

### Required Properties:

1. **Title** (Title)
   - Type: Title
   - Name: "Title"

2. **Description** (Text)
   - Type: Text
   - Name: "Description"

3. **Event Date** (Date)
   - Type: Date
   - Name: "Event Date"
   - Include time: Yes

4. **Time** (Text)
   - Type: Text
   - Name: "Time"
   - Description: "Event time (e.g., 14:00-16:00)"

5. **Location** (Text)
   - Type: Text
   - Name: "Location"

6. **Category** (Select)
   - Type: Select
   - Name: "Category"
   - Options:
     - workshop
     - conference
     - meetup
     - seminar

7. **Status** (Select)
   - Type: Select
   - Name: "Status"
   - Options:
     - upcoming (default)
     - ongoing
     - completed
     - cancelled

8. **Max Participants** (Number)
   - Type: Number
   - Name: "Max Participants"

9. **Current Participants** (Number)
   - Type: Number
   - Name: "Current Participants"
   - Default: 0

10. **Registration Required** (Checkbox)
    - Type: Checkbox
    - Name: "Registration Required"

11. **Featured Image** (Files & media)
    - Type: Files & media
    - Name: "Featured Image"

## Board Posts Database Properties

### Required Properties:

1. **Title** (Title)
   - Type: Title
   - Name: "Title"

2. **Content** (Text)
   - Type: Text
   - Name: "Content"

3. **Author** (Text)
   - Type: Text
   - Name: "Author"

4. **Category** (Select)
   - Type: Select
   - Name: "Category"
   - Options:
     - お知らせ (default)
     - 活動報告
     - 質問
     - その他

5. **Status** (Select)
   - Type: Select
   - Name: "Status"
   - Options:
     - draft (default)
     - published
     - archived

6. **Tags** (Multi-select)
   - Type: Multi-select
   - Name: "Tags"

7. **Is Pinned** (Checkbox)
   - Type: Checkbox
   - Name: "Is Pinned"

8. **Featured Image** (Files & media)
   - Type: Files & media
   - Name: "Featured Image"

## Organizations Database Properties

### Required Properties:

1. **Name** (Title)
   - Type: Title
   - Name: "Name"

2. **Description** (Text)
   - Type: Text
   - Name: "Description"

3. **Type** (Select)
   - Type: Select
   - Name: "Type"
   - Options:
     - student_group (default)
     - university
     - company
     - npo

4. **Status** (Select)
   - Type: Select
   - Name: "Status"
   - Options:
     - active (default)
     - inactive
     - pending

5. **Member Count** (Number)
   - Type: Number
   - Name: "Member Count"
   - Default: 0

6. **Location** (Text)
   - Type: Text
   - Name: "Location"

7. **Website** (URL)
   - Type: URL
   - Name: "Website"

8. **Contact Email** (Email)
   - Type: Email
   - Name: "Contact Email"

9. **Logo** (Files & media)
   - Type: Files & media
   - Name: "Logo"

10. **Joined Date** (Date)
    - Type: Date
    - Name: "Joined Date"

## 🎯 Quick Setup Checklist

For each database:
- [ ] Database created with correct name
- [ ] All properties added with exact names and types
- [ ] Select options configured correctly
- [ ] Database shared with "UNION HP CMS" integration
- [ ] Database ID copied and added to .env.local
- [ ] Test record created to verify structure

## 🔍 Verification Steps

1. **Create a test record** in each database
2. **Fill in all fields** to ensure properties work
3. **Check integration access** - try editing from code
4. **Verify data flow** - create content via admin panel

## ⚠️ Common Mistakes to Avoid

1. **Wrong property names** - Must match exactly (case-sensitive)
2. **Missing select options** - Add all required options
3. **Not sharing with integration** - Database won't be accessible
4. **Wrong database ID** - Copy the full 32-character ID
5. **Property types** - Use exact types specified above