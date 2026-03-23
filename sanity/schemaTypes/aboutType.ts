import {DocumentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const aboutType = defineType({
  name: 'about',
  title: 'About Section',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'body', title: 'Body', type: 'text'}),
  ],
})
