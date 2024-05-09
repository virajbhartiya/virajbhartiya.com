import { About } from '@/components/Home/About'
import Layout from '@/components/Layout'
import { LanguageMaqruee } from '@/components/custom/LanguageMarquee'
import { Hello } from '@/components/custom/Spline/Hello'

export const Home = () => {
  return (
    <Layout>
      <About/>
      <LanguageMaqruee />
      <Hello />
    </Layout>
  )
}
