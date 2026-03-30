import {defineArrayMember, defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export const benefitsType = defineType({
  name: 'benefits',
  title: 'Benefits Section',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'id', title: 'ID', type: 'string'}),
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'subtitle', title: 'Subtitle', type: 'string'}),
            defineField({name: 'tagline', title: 'Tagline', type: 'string'}),
            defineField({name: 'overline', title: 'Overline', type: 'string'}),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({name: 'name', title: 'Name', type: 'string'}),
                    defineField({name: 'desc', title: 'Description', type: 'string'}),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
})