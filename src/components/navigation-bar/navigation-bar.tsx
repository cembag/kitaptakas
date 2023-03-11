import './navigation-bar.scss'
import React, { useState } from 'react'
import { useAppDispatch } from '../../hooks/useStore'
import ThemeController from '../../controllers/themeController'
import { changeTheme } from '../../provider/theme/theme'
import { changeLanguage } from '../../provider/language/language'
import ITheme from '../../models/theme'
import { darkThemeImg, lightThemeImg } from '../../assets/images'
import ILanguage, { languages, LanguageType } from '../../models/language'

type navigationBarProps = {
    theme: ITheme,
    language: ILanguage
}

export default function NavigationBar (navigationBarProps: navigationBarProps): JSX.Element {

    const language = navigationBarProps.language
    const theme = navigationBarProps.theme
    const themeController = new ThemeController(theme)
    const dispatch = useAppDispatch()

    const changeTheme_ = () => dispatch(changeTheme(themeController.getTheme()))
    const isDarkTheme = theme.theme === "DARK"

    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)

    function toggleLanguageDropdown() {
        setIsLanguageDropdownOpen(prev => !prev)
    }

    return (
        <div className="navigation_bar row ai-center w-100 jc-sp-between" id="navigation_bar">
            <h2 className="logo">Wake.up</h2>
            <div className="options row a-icenter">
                <div className="language_selector">
                    <div className="current_language no-outline no-outline-focus no-border row ai-center noselect" onClick={toggleLanguageDropdown}>
                        <img className="language_image" src={require(`../../assets/images/flags/${language.language}.webp`)} alt="" />
                        <span className="language_text">{languages[language.language]}</span>
                    </div>
                    <div className="language_dropdown column" style={{
                        display: isLanguageDropdownOpen ? "flex" : "none"
                    }}>
                        {
                            Object.entries(languages).map(([lang_sh, lang_long], index): JSX.Element => {
                                return (
                                    <div key={index} 
                                        className="language no-outline no-outline-focus no-border row ai-center"
                                        style={{
                                            backgroundColor: lang_sh === language.language ? "var(--secondary-color)" : "rgba(0,0,0,0)"
                                        }}
                                        onClick={() => {
                                                dispatch(
                                                    changeLanguage(
                                                        {language: lang_sh as keyof LanguageType})
                                                )
                                                toggleLanguageDropdown()
                                            }
                                        }>
                                        <img className="language_image" src={require(`../../assets/images/flags/${lang_sh}.webp`)} alt="" />
                                        <span className="language_text">{lang_long}</span>
                                    </div>
                                )
                            }) 
                        }
                    </div>
                </div>
                <button className="theme_button no-outline no-outline-focus no-border relative" onClick={changeTheme_}>
                    <img id="theme-image" src={isDarkTheme ? darkThemeImg : lightThemeImg} alt="" />
                </button>
            </div>
        </div>
    )
}