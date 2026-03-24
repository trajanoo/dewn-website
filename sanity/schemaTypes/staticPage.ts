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
    defineField({
      name: 'sections',
      title: 'Seções',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'number', title: 'Número', type: 'string' },
          { name: 'title', title: 'Título', type: 'string' },
          { name: 'body', title: 'Conteúdo', type: 'array', of: [{ type: 'block' }] },
        ],
        preview: { select: { title: 'title', subtitle: 'number' } }
      }]
    }),
  ],
})
