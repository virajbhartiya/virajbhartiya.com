import { About } from '@/components/Home/About'
import Layout from '@/components/Layout'
import { LanguageMaqruee } from '@/components/custom/LanguageMarquee'

export const Home = () => {
  return (
    <Layout>
      <About/>
      <LanguageMaqruee />
    </Layout>
  )
}
