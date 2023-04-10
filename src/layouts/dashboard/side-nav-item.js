import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { Box, ButtonBase } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { CSSTransition } from 'react-transition-group';
import styles from '../../styles/sidebar/menuOptionsAcordion.module.scss';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const SideNavItem = (props) => {
  const { active = false, disabled, external, icon, path, title, accordion } = props;
  const [displayed, setDisplayed] = useState(false);
  const [rotate, setRotate] = useState({});
  const menu = useRef(null);
  const router = useRouter();

  const linkProps = path
    ? external
      ? {
        component: 'a',
        href: path,
        target: '_blank'
      }
      : {
        component: NextLink,
        href: path
      }
    : {};

  return (
    <li onClick={() => {
      setDisplayed(!displayed)
      setRotate(styles.iconRotate)
    }} >
        {/* <Box
          component="span"
          sx={{
            color: 'neutral.400',
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: '24px',
            whiteSpace: 'nowrap',
            ...(active && {
              color: 'common.white'
            }),
            ...(disabled && {
              color: 'neutral.500'
            })
          }}
        >
          {title}
        </Box> */}
        {
          accordion ? (
            <Accordion
              expanded={displayed}
              sx={{
                color: 'neutral.400',
                flexGrow: 1,
                fontFamily: (theme) => theme.typography.fontFamily,
                fontSize: 14,
                fontWeight: 600,
                lineHeight: '24px',
                whiteSpace: 'nowrap',
                backgroundColor: 'inherit'
              }}
              {...linkProps}
            >
              <AccordionSummary
                expandIcon={<KeyboardArrowDownIcon />}
                aria-controls="panel1bh-content"
                component="span"
                sx={{ 
                  display: 'flex',
                  alignItems: 'baseline',
                  color: 'neutral.400',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.04)'
                  }
                }}
                id="panel1bh-header"
              >
                <Typography>
                  {icon && (
                    <Box
                      component="span"
                      sx={{
                        alignItems: 'center',
                        color: 'neutral.400',
                        display: 'inline-flex',
                        justifyContent: 'center',
                        mr: 2,
                      }}
                    >
                      {icon}
                    </Box>
                  )}
                </Typography>
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  {title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {accordion.map((item, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{ 
                      color: 'neutral.400',
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      mt: '0.3em',
                      height: '2.5em',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.04)'
                      }
                    }}
                    onClick={() => router.push(item.path)}
                  >
                    <Typography sx={{ mr: '1em', display: 'flex', alignItems: 'center' }} >{item.icon}</Typography>
                    <Typography>{item.title}</Typography>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          ) : (
            <ButtonBase
              sx={{
                alignItems: 'center',
                borderRadius: 1,
                display: 'flex',
                justifyContent: 'flex-start',
                pl: '16px',
                pr: '16px',
                py: '6px',
                textAlign: 'left',
                width: '100%',
                ...(active && {
                  backgroundColor: 'rgba(255, 255, 255, 0.04)'
                }),
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.04)'
                }
              }}
              {...linkProps}
            >
              {icon && (
                <Box
                  component="span"
                  sx={{
                    alignItems: 'center',
                    color: 'neutral.400',
                    display: 'inline-flex',
                    justifyContent: 'center',
                    mr: 2,
                  }}
                >
                  {icon}
                </Box>
              )}
              <Box
                component="span"
                sx={{
                  color: 'neutral.400',
                  flexGrow: 1,
                  fontFamily: (theme) => theme.typography.fontFamily,
                  fontSize: 14,
                  fontWeight: 600,
                  lineHeight: '24px',
                  whiteSpace: 'nowrap',
                }}
              >
                {title}
              </Box>
            </ButtonBase>
          )
        }
          
        {/* {dropdown && ( 
          <Box
            component="span"
            sx={{ 
              color: 'neutral.400',
              display: 'flex',
              alignItems: 'baseline',
              ...(active && {
                color: 'primary.main'
              })
            }}
          >
            <ArrowForwardIosIcon className={rotate} style={{ transform: !displayed ? 'rotate(0deg)' : '' }} />
          </Box>
        )} */}
      {/* {dropdown && options.map(option => (
        <ButtonBase
          sx={{
            borderRadius: 1,
            textAlign: 'left',
            width: '100%',
            color: 'neutral.400',
            ...(active && {
              backgroundColor: 'rgba(255, 255, 255, 0.04)'
            }),
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.04)'
            }
          }}
          onClick={() => router.push(option.path)}
        >
          <CSSTransition nodeRef={menu} in={displayed} timeout={200} classNames={styles.menuTransition} > 
            <section
              style={{
                display: (displayed ? 'inherit' : 'none'),
                justifyContent: 'start',
                width: 'inherit',
                paddingLeft: '3em',
              }}
              ref={menu}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '1em'
              }} >{option.icon}</div>
              <p>{option.title}</p>
            </section>
          </CSSTransition>
        </ButtonBase>
      ))} */}
    </li>
  );
};

SideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired
};
