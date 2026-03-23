import {defineArrayMember, defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export const ingredientsType = defineType({
  name: 'ingredients',
  title: 'Ingredients',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'name', type: 'string'}),
            defineField({name: 'subtitle', type: 'string'}),
            defineField({name: 'desc', type: 'text'}),
          ],
        }),
      ],
    }),
  ],
})
