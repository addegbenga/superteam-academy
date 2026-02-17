import { NextRequest, NextResponse } from 'next/server'
import { serverClient } from '@workspace/sanity-client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      courseId, 
      userId, 
      userName, 
      userEmail, 
      userRole,
      userAvatar, 
      rating, 
      content 
    } = body

    // Validate
    if (!courseId || !userId || !rating) {
      return NextResponse.json(
        { error: 'courseId, userId, and rating are required' },
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    // Check if user has completed the course
    const enrollment = await serverClient.fetch(
      `*[_type == "enrollment" && courseId == $courseId && userId == $userId && completed == true][0]`,
      { courseId, userId }
    )

    if (!enrollment) {
      return NextResponse.json(
        { error: 'You must complete the course before reviewing' },
        { status: 403 }
      )
    }

    // Check for existing review
    const existingReview = await serverClient.fetch(
      `*[_type == "review" && courseId == $courseId && userId == $userId][0]`,
      { courseId, userId }
    )

    let review
    if (existingReview) {
      // Update existing review (preserve featured status)
      review = await serverClient
        .patch(existingReview._id)
        .set({
          rating,
          content,
          userName,
          userRole,
          updatedAt: new Date().toISOString(),
        })
        .commit()
    } else {
      // Create new review
      review = await serverClient.create({
        _type: 'review',
        courseId,
        userId,
        userName,
        userEmail,
        userRole,
        userAvatar,
        rating,
        content,
        featured: false,  // ← Default to not featured
        verified: true,   // ← Verified because they completed
        createdAt: new Date().toISOString(),
      })
    }

    // Recalculate course stats
    const allReviews = await serverClient.fetch(
      `*[_type == "review" && courseId == $courseId && verified == true]`,
      { courseId }
    )

    const totalReviews = allReviews.length
    const averageRating =
      allReviews.reduce((sum: number, r: any) => sum + r.rating, 0) / totalReviews

    await serverClient
      .patch(courseId)
      .set({
        'stats.averageRating': Math.round(averageRating * 10) / 10,
        'stats.totalReviews': totalReviews,
      })
      .commit()

    return NextResponse.json(
      { message: 'Review submitted successfully', review },
      { status: 201 }
    )
  } catch (error) {
    console.error('Review error:', error)
    return NextResponse.json(
      { error: 'Failed to submit review' },
      { status: 500 }
    )
  }
}

// GET user's review for a course
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get('courseId')
    const userId = searchParams.get('userId')

    if (!courseId || !userId) {
      return NextResponse.json(
        { error: 'courseId and userId are required' },
        { status: 400 }
      )
    }

    const review = await serverClient.fetch(
      `*[_type == "review" && courseId == $courseId && userId == $userId][0]`,
      { courseId, userId }
    )

    return NextResponse.json({ review })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch review' },
      { status: 500 }
    )
  }
}