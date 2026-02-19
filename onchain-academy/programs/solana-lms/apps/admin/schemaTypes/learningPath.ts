import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'learningPath',
  title: 'Learning Path',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'track',
      title: 'Track',
      type: 'string',
      options: {
        list: [
          'fundamentals',
          'defi',
          'nft',
          'gaming',
          'tooling',
        ],
      },
    }),
    defineField({
      name: 'courses',
      title: 'Courses',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'course' }] }],
      description: 'Courses in this learning path (in order)',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})