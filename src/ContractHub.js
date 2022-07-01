import React from "react";
import ReactGA from "react-ga";

import { HeaderSection } from "./sections/header/HeaderSection.js";
import { ExtensionSection } from "./sections/extension/ExtensionSection.js";
import { HistorySection } from "./sections/history/HistorySection.js";
import { CallSection } from "./sections/call/CallSection.js";

import "./ContractHub.css";

const NETWORKS = [
  {
    name: "Mainnet",
    loopchain_endpoint: "https://ctz.solidwallet.io/api/v3",
    chainalytic_endpoint: "https://yudus.dev/chainalytic-icon/api/mainnet",
    network_id: "1",
  },
  {
    name: "Sejong",
    loopchain_endpoint: "https://sejong.net.solidwallet.io/api/v3",
    chainalytic_endpoint: "https://yudus.dev/chainalytic-icon/api/testnet",
    network_id: "83",
  },
  {
    name: "Lisbon",
    loopchain_endpoint: "https://lisbon.net.solidwallet.io/api/v3",
    chainalytic_endpoint: "https://yudus.dev/chainalytic-icon/api/testnet",
    network_id: "2",
  },
  {
    name: "Custom",
    loopchain_endpoint: "http://custom_loopchain_endpoint",
    chainalytic_endpoint: "http://custom_chainalytic_endpoint",
    network_id: "0",
  },
];

const DEFAULT_CONTRACT = "cx9c4698411c6d9a780f605685153431dcda04609f";

const ContractHubContext = React.createContext();
HeaderSection.contextType = ContractHubContext;
ExtensionSection.contextType = ContractHubContext;
HistorySection.contextType = ContractHubContext;
CallSection.contextType = ContractHubContext;

ReactGA.initialize("UA-169204893-3");
ReactGA.pageview(window.location.pathname + window.location.search);

class ContractHub extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allNetworks: NETWORKS,
      network: NETWORKS[0],
      auth: {
        pkey: "",
        keystore: "",
        keystorePass: "",
        iconexWallet: "",
      },
      contract: DEFAULT_CONTRACT,
    };
  }

  updateHubState = (data) => {
    // console.log(data);
    this.setState(data);
  };

  render() {
    return (
      <div className="container-fluid contract-hub">
        <ContractHubContext.Provider
          value={{
            hubState: this.state,
            updateHubState: this.updateHubState,
          }}
        >
          <HeaderSection />
          <ExtensionSection />
          <HistorySection />
          <CallSection />
        </ContractHubContext.Provider>
      </div>
    );
  }
}

export default ContractHub;
