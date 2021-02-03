import React, { useState, useEffect, useRef } from 'react'
import { data } from './data'
import Grid from '@material-ui/core/Grid'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  button: {
    marginTop: '50px',
  },
})

function App() {
  const classes = useStyles()

  const { rules } = data

  const [menuItems, setMenuItems] = useState(
    data.menus.map((group, i) =>
      i === 0 ? group : group.map((item) => ({ ...item, disabled: true }))
    )
  )
  const [menu, setMenu] = useState([])
  // const radioRef = useRef([...new Array(3)].map(() => React.createRef()))
  const [radioGroupValues, setRadioGroupValues] = useState({
    0: '',
    1: '',
    2: '',
  })

  const [restrictions, setRestrictions] = useState({})

  const selectedMenuChange = (e, groupId) => {
    switch (groupId) {
      case 0:
        setRadioGroupValues({
          ...radioGroupValues,
          [groupId]: e?.target?.value,
          1: '',
          2: '',
        })

        setRestrictions({
          ...restrictions,
          [groupId]: [...rules[e?.target?.value]],
        })
        break
      case 1:
        setRadioGroupValues({
          ...radioGroupValues,
          [groupId]: e?.target?.value,
          2: '',
        })
        if (rules[e?.target?.value]) {
          setRestrictions({
            ...restrictions,
            [groupId]: [...rules[e?.target?.value]],
          })
        } else {
          setRestrictions({
            ...restrictions,
            [groupId]: [],
          })
        }

        break
      case 2:
        setRadioGroupValues({
          ...radioGroupValues,
          [groupId]: e?.target?.value,
        })
        break

      default:
    }
  }

  useEffect(() => {
    const restrict = Object.keys(restrictions).reduce(
      (acc, key) => acc.concat(restrictions[key]),
      []
    )
    console.log(menuItems)
    if (radioGroupValues[0] !== '') {
      setMenu(
        menuItems.map((group, i) =>
          group.map((item) => ({
            ...item,
            disabled: restrict?.includes(Number(item.id)),
          }))
        )
      )
    } else {
      setMenu(menuItems)
    }

    // console.log(restrictions)
  }, [restrictions, menuItems, radioGroupValues])

  return (
    <>
      <form>
        <Box>
          <Grid container spacing={3}>
            {console.log(menu)}
            {menu?.map((group, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Card>
                  <CardContent>
                    <CardContent>
                      <FormControl component='fieldset'>
                        {i === 0 ? (
                          <FormLabel component='legend'>Menu</FormLabel>
                        ) : (
                          ''
                        )}
                        <RadioGroup
                          aria-label='menu'
                          name='menu'
                          onChange={(e) => selectedMenuChange(e, i)}
                          value={radioGroupValues[i]}
                          // ref={radioRef.current[i]}
                        >
                          {group.map((item) => (
                            <FormControlLabel
                              value={item.id}
                              control={<Radio />}
                              label={item.value}
                              disabled={item?.disabled}
                              key={item.id}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </CardContent>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box>
          <Button
            variant='contained'
            color='secondary'
            className={classes.button}
            disabled={
              !Object.keys(radioGroupValues).every(
                (key) => radioGroupValues[key] !== ''
              )
            }
          >
            Submit
          </Button>
        </Box>
      </form>
    </>
  )
}

export default App
