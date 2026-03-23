import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export const staticPage = defineType({
  name: 'staticPage',
  title: 'Static Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}}),
    defineField({name: 'intro', title: 'Intro', type: 'text'}),
    defineField({name: 'body', title: 'Body', type: 'text'}),
  ],
})
