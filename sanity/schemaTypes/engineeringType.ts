import {defineArrayMember, defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export const engineeringType = defineType({
  name: 'engineering',
  title: 'Engineering Section',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({name: 'overline', type: 'string'}),
    defineField({name: 'title', type: 'string'}),
    defineField({
      name: 'metrics',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'string'}),
            defineField({name: 'desc', type: 'text'}),
            defineField({name: 'stat', type: 'string'}),
          ],
        }),
      ],
    }),
  ],
})
