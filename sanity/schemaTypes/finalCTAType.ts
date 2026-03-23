import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export const finalCTAType = defineType({
  name: 'finalCTA',
  title: 'Final CTA',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({name: 'subtitle', type: 'string'}),
    defineField({name: 'buttonLabel', type: 'string'}),
  ],
})
