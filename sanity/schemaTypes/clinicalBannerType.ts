import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export const clinicalBannerType = defineType({
  name: 'clinicalBanner',
  title: 'Clinical Banner',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({name: 'overline', type: 'string'}),
    defineField({name: 'title', type: 'string'}),
    defineField({name: 'linkText', type: 'string'}),
    defineField({name: 'linkUrl', type: 'string'}),
  ],
})
