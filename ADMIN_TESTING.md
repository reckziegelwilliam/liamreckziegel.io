# Admin Testing Guide

This document provides comprehensive testing instructions for all admin features.

## Prerequisites

- Admin access (email must be in `app/lib/permissions.ts`)
- Logged in with GitHub OAuth
- Database migrations completed

## Testing Checklist

### Phase 1: Authentication & Security

#### Test 1.1: Login Flow
- [ ] Visit `/dashboard` while logged out → should redirect to home with error
- [ ] Login with GitHub → should redirect to dashboard
- [ ] Verify admin email is in permissions list

#### Test 1.2: Permission Checks
- [ ] Try creating a post → should succeed if editor/admin
- [ ] Try deleting a post → should succeed only if admin
- [ ] Try deleting contact → should succeed only if admin
- [ ] Try accessing settings → should succeed only if admin

#### Test 1.3: Unauthorized Access
- [ ] Change admin email in permissions.ts to different email
- [ ] Restart server
- [ ] Try accessing `/dashboard` → should redirect with unauthorized error
- [ ] Restore original email

### Phase 2: Dashboard

#### Test 2.1: Stats Display
- [ ] Visit `/dashboard`
- [ ] Verify all stat cards show correct counts:
  - Total Posts
  - Contact Submissions
  - Published Posts
- [ ] Click each stat card → should navigate to respective page

#### Test 2.2: Recent Activity
- [ ] Verify recent posts list shows last 5 posts
- [ ] Verify recent contacts shows last 5 submissions
- [ ] Click post → should navigate to edit page
- [ ] Verify unread indicator on contacts

#### Test 2.3: Quick Actions
- [ ] Click "Create New Post" → should navigate to `/blog/new`
- [ ] Click "Manage Posts" → should navigate to `/blog`
- [ ] Click "View Contacts" → should navigate to `/contact`

### Phase 3: Blog Management

#### Test 3.1: Post List
- [ ] Visit `/blog`
- [ ] Verify stats show correct counts (total, drafts, published)
- [ ] Verify drafts section displays draft posts
- [ ] Verify published section displays published posts

#### Test 3.2: Create Post
- [ ] Click "New Post"
- [ ] Fill in all fields
- [ ] Test markdown editor:
  - [ ] Switch between Edit/Preview tabs
  - [ ] Verify word count updates
  - [ ] Verify reading time calculates
- [ ] Save as draft → should redirect to `/blog`
- [ ] Verify auto-save indicator shows timestamp

#### Test 3.3: Edit Post
- [ ] Click Edit on a post
- [ ] Verify unique storage key for auto-save
- [ ] Modify content
- [ ] Save as draft → should update
- [ ] Publish → should change status
- [ ] View live → should open published post

#### Test 3.4: Delete Post
- [ ] Click Delete
- [ ] Verify confirmation required
- [ ] Confirm delete → should redirect to `/blog`
- [ ] Verify post removed from list

### Phase 4: Contact Management

#### Test 4.1: Contact List
- [ ] Visit `/contact`
- [ ] Verify filter tabs show correct counts
- [ ] Click each filter tab:
  - [ ] All
  - [ ] Unread
  - [ ] Read
  - [ ] Replied
  - [ ] Archived

#### Test 4.2: Status Management
- [ ] On unread submission, click "Mark as Read"
- [ ] Verify status updates and toast notification appears
- [ ] Click "Mark as Replied" → verify update
- [ ] Click "Archive" → verify moved to archived
- [ ] Test on different submissions

#### Test 4.3: Contact Actions
- [ ] Click email address → should open mail client
- [ ] Verify budget and timeline display correctly
- [ ] Test delete:
  - [ ] Click Delete
  - [ ] Confirm → verify removal and toast

### Phase 5: Analytics Dashboard

#### Test 5.1: Stats Overview
- [ ] Visit `/analytics`
- [ ] Verify 4 stat cards display:
  - Total Views
  - Published Posts
  - Contact Submissions
  - Conversion Rate

#### Test 5.2: Charts
- [ ] Verify "Page Views (Last 30 Days)" chart displays
- [ ] Hover over data points → verify tooltip shows correct data
- [ ] Verify "Contacts (Last 30 Days)" chart displays
- [ ] Check if empty state shows when no data

#### Test 5.3: Popular Posts
- [ ] Verify most viewed posts list shows
- [ ] Click post title → should open in new tab
- [ ] Verify view count displays
- [ ] Check empty state if no views

#### Test 5.4: Views by Type
- [ ] Verify views by type section shows
- [ ] Verify percentage bars display correctly
- [ ] Check calculations match totals

### Phase 6: Media Library

#### Test 6.1: Upload
- [ ] Visit `/media`
- [ ] Drag and drop image → verify upload
- [ ] Click browse and select file → verify upload
- [ ] Try uploading file > 10MB → should show error
- [ ] Try uploading non-image → should show error
- [ ] Verify toast notification on success

#### Test 6.2: Media Grid
- [ ] Verify uploaded images display in grid
- [ ] Hover over image → verify action buttons appear
- [ ] Click Copy URL → verify toast and clipboard

#### Test 6.3: Delete Media
- [ ] Click Delete button
- [ ] Confirm → verify removal
- [ ] Verify toast notification

#### Test 6.4: Stats
- [ ] Verify Total Storage shows correct size
- [ ] Verify media type counts display correctly

### Phase 7: Settings

#### Test 7.1: Access Control
- [ ] Login as non-admin user
- [ ] Visit `/settings` → should show access denied message
- [ ] Login as admin
- [ ] Visit `/settings` → should show form

#### Test 7.2: Site Information
- [ ] Update site title → save
- [ ] Update description → save
- [ ] Update URL → save
- [ ] Verify toast notification on success

#### Test 7.3: Social Links
- [ ] Update GitHub URL → save
- [ ] Update Twitter URL → save
- [ ] Update LinkedIn URL → save
- [ ] Verify form persists values

#### Test 7.4: SEO Configuration
- [ ] Update default meta title → save
- [ ] Update default description → save
- [ ] Verify character count updates
- [ ] Verify 160 char limit on description

#### Test 7.5: Feature Flags
- [ ] Toggle Analytics → verify checkbox updates
- [ ] Toggle Contact Form → verify checkbox updates
- [ ] Save → verify settings persist

### Phase 8: Navigation

#### Test 8.1: Sidebar
- [ ] Verify all nav items display
- [ ] Click each item:
  - [ ] Dashboard → `/dashboard`
  - [ ] Blog → `/blog`
  - [ ] Contact → `/contact`
  - [ ] Analytics → `/analytics`
  - [ ] Media → `/media`
  - [ ] Settings → `/settings`
- [ ] Verify active state highlights current page
- [ ] Click "Back to Site" → should navigate to homepage

#### Test 8.2: Breadcrumbs
- [ ] Navigate through pages
- [ ] Verify Back links work correctly
- [ ] Test browser back button

### Phase 9: Error Handling

#### Test 9.1: Error Boundary
- [ ] Force an error (modify code to throw)
- [ ] Verify error page displays
- [ ] Click "Try Again" → should reset
- [ ] Click "Go to Dashboard" → should navigate

#### Test 9.2: Toast Notifications
- [ ] Verify success toasts show for:
  - Saving posts
  - Updating contacts
  - Uploading media
  - Saving settings
- [ ] Verify error toasts show for:
  - Failed saves
  - Upload errors
  - Permission errors

### Phase 10: Performance

#### Test 10.1: Loading States
- [ ] Dashboard stats should show loading skeletons
- [ ] Charts should show loading states
- [ ] Forms should disable during submission

#### Test 10.2: Auto-save
- [ ] Edit post content
- [ ] Wait 30 seconds
- [ ] Verify auto-save timestamp updates
- [ ] Refresh page (without saving)
- [ ] Verify content persisted in localStorage
- [ ] Open different post
- [ ] Verify each post has unique storage

## Performance Benchmarks

- Dashboard load: < 2 seconds
- Blog list load: < 1 second
- Media upload: < 5 seconds for 5MB file
- Settings save: < 1 second

## Browser Compatibility

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

## Mobile Responsive

- [ ] Test dashboard on mobile (should show nav menu)
- [ ] Test forms on mobile (should be scrollable)
- [ ] Test media upload on mobile
- [ ] Test charts on mobile (should be responsive)

## Security Tests

- [ ] Try accessing admin routes without login
- [ ] Try modifying another user's content (if multi-user)
- [ ] Test XSS in markdown editor
- [ ] Test SQL injection in search fields
- [ ] Verify all actions require authentication

## Known Issues

Document any issues found during testing:

1. **Issue:** [Description]
   - **Severity:** High/Medium/Low
   - **Steps to reproduce:** [Steps]
   - **Expected:** [Expected behavior]
   - **Actual:** [Actual behavior]

## Sign Off

- [ ] All critical tests passed
- [ ] All medium priority tests passed
- [ ] Known issues documented
- [ ] Ready for production

**Tested by:** _______________  
**Date:** _______________  
**Version:** _______________

