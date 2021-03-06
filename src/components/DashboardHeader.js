import * as selectors from '../selectors'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'
import { Btn } from './common'
import styled from 'styled-components'
import React from 'react'
import Web3 from 'web3'
const { clipboard } = window.require('electron')

const Container = styled.header`
  border-bottom: 1px solid ${p => p.theme.colors.darkShade};
  padding: 1.8rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Title = styled.h1`
  font-size: 2.4rem;
  line-height: 3rem;
  white-space: nowrap;
  margin: 0;
  text-shadow: 0 1px 1px ${p => p.theme.colors.darkShade};
`

const AddressContainer = styled.div`
  display: flex;
  align-items: center;
`

const Label = styled.div`
  padding: 0.8rem;
  font-size: 1.3rem;
  text-shadow: 0 1px 1px ${p => p.theme.colors.darkShade};
  letter-spacing: 0.5px;
  font-weight: 600;
  opacity: 0;

  @media (min-width: 800px) {
    opacity: 1;
  }
`

const Bg = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px;
  padding: 2px;
  background-color: ${p => p.theme.colors.lightShade};
`

const Address = styled.div`
  padding: 0 1.6rem;
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: normal;
  text-shadow: 0 1px 1px ${p => p.theme.colors.darkShade};
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 240px;
  @media (min-width: 960px) {
    max-width: 100%;
  }
`

const CopyBtn = Btn.extend`
  border-radius: 0 2px 2px 0;
  line-height: 1.8rem;
  padding: 0.5rem 0.8rem;
  font-size: 1.4rem;
  letter-spacing: 1.4px;
  text-transform: uppercase;
`

class DashboardHeader extends React.Component {
  static propTypes = {
    address: PropTypes.string.isRequired
  }

  onCopyToClipboardClick = () => {
    clipboard.writeText(this.props.address)
    if (!toast.isActive(this.toastId)) {
      this.toastId = toast('Address copied to clipboard', {
        closeButton: false,
        autoClose: 2000
      })
    }
  }

  render() {
    const { address } = this.props

    return (
      <div className="container">
        <div className="balance">
          <div className="balance__info">
            {/* <div >
              <span data-testid="address">Address: {address}v</span>
              <button onClick={this.onCopyToClipboardClick}>Copy</button>
            </div> */}
            <span>Balance</span>
            <div class="balance__sum">
              <span class="sum">0.69803</span>
              <p><span>SIG </span>($8.35)</p>
            </div>
          </div>
          <div class="balance__control">
            <a class="controlBtn">Deposit</a>
            <a class="controlBtn">Send</a>
          </div>

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const address = selectors.getActiveWalletAddresses(state)[0]
  return {
    address: address ? Web3.utils.toChecksumAddress(address) : address
  }
}

export default connect(mapStateToProps)(DashboardHeader)
