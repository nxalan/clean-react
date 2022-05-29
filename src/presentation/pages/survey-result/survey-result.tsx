import React, { useEffect, useState } from 'react'
import Styles from './survey-result-styles.scss'
import { Footer, Header, Loading, Error } from '@/presentation/components'
import { SurveyResultData } from '@/presentation/pages/survey-result/components'
import { LoadSurveyResult } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState((prevState) => ({ ...prevState, surveyResult: null, error: error.message }))
  })

  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
    reload: false
  })

  const reload = (): void => {
    setState((prevValues) => ({ isLoading: false, surveyResult: null, error: '', reload: !prevValues.reload }))
  }

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => setState(prevState => ({ ...prevState, surveyResult })))
      .catch(handleError)
  }, [state.reload])

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div data-testid="survey-result" className={Styles.contentWrap}>
        {state.surveyResult && (<SurveyResultData surveyResult={state.surveyResult}/>)}
        {state.isLoading && (<Loading />)}
        {state.error && (<Error error={state.error} reload={reload} />)}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
