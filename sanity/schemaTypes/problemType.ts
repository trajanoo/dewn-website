import {defineArrayMember, defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export const problemType = defineType({
  name: 'problem',
  title: 'Problem Section',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({name: 'paragraphs', type: 'array', of: [defineArrayMember({type: 'text'})]}),
    defineField({name: 'image', type: 'image'}),
    defineField({name: 'statTitle', type: 'string'}),
    defineField({name: 'statValue', type: 'string'}),
  ],
})
