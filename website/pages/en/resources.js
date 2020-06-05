/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const React = require("react");
const CompLibrary = require("../../core/CompLibrary.js");
const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */

const CWD = process.cwd();
const siteConfig = require(CWD + '/siteConfig.js');
const versions = require(CWD + '/versions.json');

const docsUrl = siteConfig.url + siteConfig.baseUrl;
const repoUrl = siteConfig.repoUrl;

const textContent = {
  resourceslist: `
  `,
};

class Resources extends React.Component {
  render() {

    let currentVersion = versions.length > 0 ? versions[0] : null;
    let latestVersions = ['next'].concat(
      versions.filter(version => version.indexOf('-RC') !== -1)
    );
    const stableVersions = versions.filter(
      version => version.indexOf('-RC') === -1
    );

    const { config: siteConfig, language = "" } = this.props;
    const { baseUrl } = siteConfig;

    const ResourceCardItem = ({ videotitle, videotype, videodifficulty, speakername, imgurl, videodisc, cardlink}) => (
      <div className="CenterContent">
      <a href={cardlink}>
        <div className="videocard" style={{maxHeight: 380, marginBottom: 50}}>
            <div style={{position: 'relative'}}>
              <div style={{maxWidth: '100%', maxHeight: '50%'}}>
                <img src={imgurl} alt="videoimg"/>
              </div>
              <div className="videocardlengthtip">
                <div>
                    <div>
                        <img style={{width: 14, height: 14}} src="https://image.flaticon.com/icons/svg/25/25231.svg" alt="timeicon"/>
                    </div>
                </div>
              </div>
            </div>
            <div className="videocardcontent">
              <div className="videocardheader">
                <p style={{fontsize: 46, fontWeight: 700}}>{videotitle}</p>
                <div className="videocardinfo">
                  <p style={{fontSize: 14}}>{videotype}</p>
                </div>
              </div>
              <div style={{marginBottom: 15}}>
                <div >{videodisc}</div>
              </div>
            </div>
        </div>
        </a>
      </div>
    );

    const Section = ({ children, className, background = "light" }) => (
      <section className={`Section ${className} ${background}`}>
        {children}
      </section>
    );

    const VideoCardList = () => (
      <Section background="tint">
        <div className="content">
          <h1 style={{marginTop: -35}}>Resources</h1>
          <p>The follow is a list of resources related to React Native for Windows and macOS to help you get started or to better accelerate your development in this area.</p>
          <div className="row">
             <div className="column">
              <ResourceCardItem
                videolength="Repo"
                videotitle="React Native for Windows"
                videotype="Github Repo"
                cardlink="https://github.com/Microsoft/react-native-windows"
                imgurl="https://raw.githubusercontent.com/microsoft/react-native-windows/master/.github/hero2.png"
                videodisc="Official React Native for Windows framework for building native Windows applications with React."/>
                <ResourceCardItem
                  videolength="Repo"
                  videotitle="Fluent UI React Native (FURN)"
                  cardlink="https://github.com/microsoft/fluentui-react-native"
                  videotype="Github Repo"
                  imgurl="./img/homepage/fluentUI_image.png"
                  videodisc="FluentUI React Native is a javascript component library providing developers with controls that are in the Fluent Design System."/>
                  <ResourceCardItem
                    videolength="Repo"
                    videotitle="Hermes for Windows"
                    cardlink="https://github.com/microsoft/hermes-windows"
                    videotype="Github Repo"
                    imgurl="./img/homepage/hermes_logo_small.png"
                    videodisc="Microsoft’s fork of facebook/Hermes that brings Windows support to the lightweight JS engine for React Native."/>
                    <ResourceCardItem
                      videolength="Repo"
                      videotitle="React Native Test App"
                      videotype="Github Repo Sample"
                      cardlink="https://github.com/microsoft/react-native-test-app"
                      imgurl="https://raw.githubusercontent.com/microsoft/react-native-windows/master/.github/hero2.png"
                      videodisc="React Native Test App provides test apps for all platforms as a package."/>
             </div>
             <div className="column">
              <ResourceCardItem
                videolength="Repo"
                videotitle="React Native for macOS"
                cardlink="https://github.com/Microsoft/react-native-macos"
                videotype="Github Repo"
                imgurl="./img/homepage/native_and_js_mac_cropped.png"
                videodisc="Official React Native for macOS framework for building native macOS applications with React."/>
                <ResourceCardItem
                  videolength="Repo"
                  videotitle="Dual Screen"
                  videotype="Github Repo"
                  imgurl="./img/homepage/duo.jpg"
                  cardlink="https://github.com/microsoft/react-native-dualscreen"
                  videodisc="Microsoft's offerings to streamline dual-screen cross-platform development using React Native. The modules in the repo are targeting Windows and Android."/>
                  <ResourceCardItem
                    videolength="Repo"
                    videotitle="VS Code RN extension"
                    videotype="Github Repo"
                    imgurl="./img/homepage/vs_code_logo.png"
                    cardlink="https://github.com/Microsoft/vscode-react-native"
                    videodisc="React Native extension for VS Code enables you to debug your code and quickly and run react-native commands from the command palette."/>
                    <ResourceCardItem
                      videolength="Repo"
                      videotitle="App Center SDK for React Native"
                      videotype="Github Repo"
                      imgurl="./img/homepage/appcenter_logo.png"
                      cardlink="https://github.com/microsoft/appcenter-sdk-react-native"
                      videodisc="React Native extension for VS Code enables you to debug your code and quickly and run react-native commands from the command palette."/>
             </div>
          </div>
        </div>
      </Section>
    );

    return (
      <div className="homepage">
        <VideoCardList/>
      </div>
    );
  }
}

module.exports = Resources;
