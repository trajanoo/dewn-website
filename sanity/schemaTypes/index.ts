import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {siteSettings} from './siteSettings'
import {aboutType} from './aboutType'
import {benefitsType} from './benefitsType'
import {productType} from './productType'
import {faqType} from './faqType'
import {footerSettings} from './footerSettings'
import {clinicalBannerType} from './clinicalBannerType'
import {engineeringType} from './engineeringType'
import {finalCTAType} from './finalCTAType'
import {ingredientsType} from './ingredientsType'
import {navbarType} from './navbarType'
import {staticPage} from './staticPage'
import {problemType} from './problemType'
import {technicalThesis} from './technicalThesisType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    siteSettings,
    aboutType,
    benefitsType,
    productType,
    faqType,
    footerSettings,
    clinicalBannerType,
    engineeringType,
    finalCTAType,
    ingredientsType,
    staticPage,
    navbarType,
    technicalThesis,
    problemType,
  ],
}
