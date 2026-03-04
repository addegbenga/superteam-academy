# CMS Guide

This guide explains how to create, edit, and manage courses and content in Superteam Academy using Sanity Studio.

## Accessing the CMS

```bash
# Start the CMS development server
cd apps/admin
pnpm dev
```

Open http://localhost:3002 in your browser.

## Content Schema Overview

### Document Types

| Type           | Description                                 |
| -------------- | ------------------------------------------- |
| `course`       | Complete course with modules, metadata      |
| `module`       | Course section containing lessons           |
| `lesson`       | Individual lesson (content/video/challenge) |
| `instructor`   | Course instructor profile                   |
| `achievement`  | Achievement/badge definition                |
| `learningPath` | Curated learning track                      |
| `review`       | Student course reviews                      |
| `enrollment`   | Enrollment statistics                       |

## Creating a Course

### Step 1: Create Instructors

Before creating a course, add instructors:

1. Navigate to **Instructors** in the sidebar
2. Click **Create** → **Instructor**
3. Fill in:
   - **Name**: Instructor display name
   - **Bio**: Short biography
   - **Avatar**: Profile image
   - **Social Links**: Twitter, GitHub, website

### Step 2: Create Modules

Create modules that will contain lessons:

1. Navigate to **Modules** → **Create** → **Module**
2. Fill in:
   - **Title**: Module name (e.g., "Introduction to Solana")
   - **Description**: Brief overview
   - **Order**: Display order within course
   - **Lessons**: Reference existing or create new lessons

### Step 3: Create Lessons

Lessons can have multiple content types:

1. Navigate to **Lessons** → **Create** → **Lesson**
2. Configure content types:

#### Basic Settings

- **Title**: Lesson name
- **Slug**: Auto-generated from title
- **Order**: Position within module
- **Duration**: Estimated minutes
- **XP Reward**: Points earned (10-200)

#### Content Types (toggle each)

| Setting            | Description               |
| ------------------ | ------------------------- |
| `hasVideo`         | Enable video content      |
| `hasTextContent`   | Enable written content    |
| `hasCodeChallenge` | Enable interactive coding |

#### Video Content

If `hasVideo` is enabled:

- **Video Provider**: YouTube, Vimeo, Loom, or Direct URL
- **Video URL**: Embed URL
- **Video Duration**: Length in minutes
- **Video Thumbnail**: Optional custom thumbnail

#### Text Content

If `hasTextContent` is enabled:

- **Content**: Portable Text editor
  - Headings (H2-H4)
  - Paragraphs
  - Bold, italic, code, underline, strikethrough
  - Links
  - Images with captions
  - Code blocks with syntax highlighting

#### Code Challenge

If `hasCodeChallenge` is enabled:

- **Challenge Prompt**: Clear objectives
- **Starter Code**: Pre-populated code
- **Solution**: Reference solution (hidden from students)
- **Test Cases**: Validation tests
  - **Name**: Test description
  - **Input**: Test input
  - **Expected Output**: Correct output
  - **Hidden**: Hide from student (optional)

#### Additional Fields

- **Hints**: Progressive hints for students
- **Resources**: External links (documentation, articles, tools)

### Step 4: Create the Course

1. Navigate to **Courses** → **Create** → **Course**
2. Fill in all required fields:

#### Basic Info

- **Title**: Course name
- **Slug**: URL-friendly identifier
- **Description**: Short summary (max 500 chars)
- **Full Description**: Detailed content (shown after "Read more")

#### Media

- **Thumbnail**: Course cover image (16:9 recommended)

#### Classification

- **Difficulty**: Beginner, Intermediate, or Advanced
- **Learning Track**: Fundamentals, DeFi, NFT, Gaming, Tooling
- **Duration**: Estimated hours
- **XP Reward**: Total XP for completion

#### Structure

- **Modules**: Reference created modules
- **Instructors**: Reference instructors
- **Prerequisites**: Other courses that should be completed first

#### Achievement

- **Completion Achievement**: Badge to award on course completion

#### Status

- **Draft**: Work in progress
- **Published**: Live on platform
- **Archived**: Hidden from students

### Step 5: Publish

1. Set **Status** to **Published**
2. Click **Publish** in the top-right corner

## Localization

Courses support multiple languages:

### Adding Translations

1. Create a course in each language
2. Use the language field (auto-detected or select manually)
3. Use consistent slugs: `/solana-basics` (en), `/fundamentos-solana` (es)

### Supported Languages

| Code | Language   | Flag |
| ---- | ---------- | ---- |
| `en` | English    | 🇺🇸   |
| `es` | Spanish    | 🇪🇸   |
| `pt` | Portuguese | 🇧🇷   |

## Managing Content

### Draft Workflow

1. Create content as **Draft**
2. Preview changes in the LMS
3. Publish when ready

### Version History

Sanity automatically tracks version history. To restore:

1. Open the document
2. Click **History** in the sidebar
3. Select a version and click **Restore**

### Media Management

Upload images directly in the editor:

- Click the image icon in the text editor
- Drag and drop or browse files
- Images are automatically optimized

## Best Practices

### Course Structure

- Start with an introductory module
- Mix content types (video + text + challenges)
- End each module with a hands-on challenge
- 5-10 lessons per module is ideal

### Lesson Design

- Keep lessons focused on one concept
- Include practical examples
- Provide hints for difficult challenges
- Test all code challenges before publishing

### Content Guidelines

- Use clear, concise language
- Include code comments
- Add images for complex concepts
- Provide external resources for deeper learning

## Troubleshooting

### Lessons Not Showing

- Check course status is **Published**
- Ensure modules are referenced in course
- Verify lessons are referenced in modules

### Code Challenges Not Working

- Verify test cases have expected output
- Check starter code syntax
- Ensure solution code is valid

### Images Not Loading

- Verify image upload succeeded
- Check image dimensions (max 5MB)
- Ensure alt text is provided
