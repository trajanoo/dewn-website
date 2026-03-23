import {DocumentIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const benefitsType = defineType({
  name: 'benefits',
  title: 'Benefits Section',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'id', type: 'string'}),
            defineField({name: 'title', type: 'string'}),
            defineField({name: 'subtitle', type: 'string'}),
            defineField({name: 'tagline', type: 'string'}),
            defineField({name: 'overline', type: 'string'}),
            defineField({name: 'image', type: 'image'}),
            defineField({
              name: 'items',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({name: 'name', type: 'string'}),
                    defineField({name: 'desc', type: 'string'}),
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
