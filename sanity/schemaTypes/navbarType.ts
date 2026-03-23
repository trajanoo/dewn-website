import {defineArrayMember, defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export const navbarType = defineType({
  name: 'navbar',
  title: 'Navbar',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({name: 'siteTitle', type: 'string'}),
    defineField({name: 'logo', type: 'image'}),
    defineField({
      name: 'menu',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'label', type: 'string'}),
            defineField({name: 'target', type: 'string'}),
          ],
        }),
      ],
    }),
  ],
})
