import { defineArrayMember, defineField, defineType } from 'sanity';

export const campaign = defineType({
  name: 'campaign',
  title: 'Campaign',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Campaign name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', title: 'Web address name', type: 'slug', options: { source: 'title' }, description: 'Use bbc to add photographs to the existing Billionaire Boys Club gallery.', validation: (rule) => rule.required() }),
    defineField({ name: 'order', title: 'Display order', type: 'number', initialValue: 10 }),
    defineField({
      name: 'media', title: 'Photos & videos', type: 'array',
      description: 'Upload original images here. Drag items to change their order. The website requests optimized versions; originals stay in Sanity. Storage and upload limits depend on your plan.',
      of: [
        defineArrayMember({
          name: 'photograph', title: 'Photograph', type: 'image', options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Image description', type: 'string', validation: (rule) => rule.required() })],
          validation: (rule) => rule.required().assetRequired(),
        }),
        defineArrayMember({
          name: 'video', title: 'Video', type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Video title', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'file', title: 'Video file', type: 'file', options: { accept: 'video/mp4,video/webm' }, description: 'Browser-ready MP4 or WebM. Sanity stores this file without transcoding it.', validation: (rule) => rule.required() }),
            defineField({ name: 'poster', title: 'Cover image', type: 'image', options: { hotspot: true } }),
          ],
          preview: { select: { title: 'title', media: 'poster' } },
        }),
      ],
    }),
  ],
  orderings: [{ title: 'Display order', name: 'displayOrder', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title' } },
});
