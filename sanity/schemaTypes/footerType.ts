import {DocumentIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const footerType = defineType({
  name: 'footerSettings',
  title: 'Footer Settings',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({name: 'siteName', type: 'string'}),
    defineField({name: 'legalText', type: 'text'}),
    defineField({
      name: 'links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'string'}),
            defineField({name: 'url', type: 'string'}),
          ],
        }),
      ],
    }),
  ],
})
