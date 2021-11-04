import { FC, useState } from 'react'
import { FieldProps, getIn } from 'formik'
import { TextFieldProps, TextField } from '@material-ui/core'
import EyeIcon from 'images/styledImages/eyeIcon'
import CrossedEyeIcon from 'images/styledImages/crossedEyeIcon'
import styled from 'styled-components/macro'


export const FormInput: FC<FieldProps & TextFieldProps> = props => {
  const isTouched = getIn(props.form.touched, props.field.name)
  const errorMessage = getIn(props.form.errors, props.field.name)

  const { error, helperText, type = 'text', field, form, ...rest } = props

  const [canPick, setCanPick] = useState(false)

  return (
    <Wrapper>
      <TextField
        fullWidth
        variant="outlined"
        error={error ?? Boolean(isTouched && errorMessage)}
        helperText={helperText ?? ((isTouched && errorMessage) ? errorMessage : undefined)}
        type={(type === 'password' && !canPick) ? 'password' : type}

        {...rest} // includes any Material-UI specific props
        {...field} // includes all props contributed by the Formik Field/FastField
      />
      {type === 'password' && (
        <PickerWrapper
          onClick={() => {
            setCanPick(!canPick);
          }}
          className='eyeButton'
        //size="small"
        >
          {canPick === false ? (
            <EyeIcon color={'var(--textGrey)'} />
          ) : (
            <CrossedEyeIcon color={'var(--textGrey)'} />
          )}
        </PickerWrapper>
      )}
    </Wrapper>
  )
}
const PickerWrapper = styled.div`
    position: absolute;
    right: 10px;
    top: 6px;
    cursor: pointer;
`
const Wrapper = styled.div`
position:relative;
width:100%;


`