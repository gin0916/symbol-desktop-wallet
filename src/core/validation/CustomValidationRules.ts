// external dependencies
import {extend} from 'vee-validate'
import i18n from '@/language'
import {Address, Password, Account, NetworkType} from 'nem2-sdk'

// internal dependencies
import {AccountsRepository} from '@/repositories/AccountsRepository'
import {WalletsRepository} from '@/repositories/WalletsRepository'
import {AccountService} from '@/services/AccountService'
import {NotificationType} from '@/core/utils/NotificationType'
import {AppStore} from '@/app/AppStore'

import {
  AddressValidator,
  AliasValidator,
  MaxDecimalsValidator,
  UrlValidator,
  PublicKeyValidator,
} from './validators'

export class CustomValidationRules {
  /**
   * Registers custom validation rules
   * @static
   */
  public static register(): void {
    extend('address', {
      validate: (value) => {
        return AddressValidator.validate(value)
      },
      message: `${i18n.t(`${NotificationType.ADDRESS_INVALID}`)}`,
    })

    extend('maxDecimals', {
      validate: (value, args: any) => {
        const {maxDecimalNumber} = args
        return MaxDecimalsValidator.validate(value, maxDecimalNumber)
      },
      message: `${i18n.t('max_decimal_number_error')}`,
      params: ['maxDecimalNumber'],
    })

    extend('addressOrAlias', {
      validate: (value) => {
        const isValidAddress = AddressValidator.validate(value)
        const isValidAlias = AliasValidator.validate(value)
        if (isValidAddress || isValidAlias) return true
        return false
      },
      message: `${i18n.t('incorrect_field_error')}`,
    })

    extend('addressOrAliasNetworkType', {
      validate: (value, args: any) => {
        const {networkType} = args
        if (!AddressValidator.validate(value)) return true
        return Address.createFromRawAddress(value).networkType == networkType
      },
      message: `${i18n.t(`${NotificationType.NETWORK_TYPE_INVALID}`)}`,
      params: ['networkType'],
    })

    extend('url', {
      validate: (value) => {
        return UrlValidator.validate(value)
      },
      message: `${i18n.t('incorrect_field_error')}`,
    })

    extend('confirmPassword', {
      validate(value, args: any) {
        const {target} = args
        return value === target
      },
      message: `${i18n.t(`${NotificationType.PASSWORDS_NOT_MATCHING}`)}`,
      params: ['target'],
    })

    extend('newAccountName', {
      validate(value) {
        return new AccountsRepository().find(value) === false
      },
      message: `${i18n.t(`${NotificationType.ACCOUNT_NAME_EXISTS_ERROR}`)}`,
    })

    extend('accountPassword', {
      validate(value) {
        if (!value || value.length < 8) {
          return false
        }

        const currentAccount = AppStore.getters['account/currentAccount']
        const currentHash = currentAccount.values.get('password')
        const inputHash = new AccountService(AppStore).getPasswordHash(new Password(value))
        return inputHash === currentHash
      },
      message: `${i18n.t(`${NotificationType.WRONG_PASSWORD_ERROR}`)}`,
    })

    extend('accountWalletName', {
      validate(value) {
        const accountsRepository = new AccountsRepository()
        const walletsRepository = new WalletsRepository()

        // - fetch current account wallets
        const currentAccount = AppStore.getters['account/currentAccount']
        const knownWallets = Array.from(accountsRepository.fetchRelations(
          walletsRepository,
          currentAccount,
          'wallets'
        ).values())

        return undefined === knownWallets.find(w => value === w.values.get('name'))
      },
      message: `${i18n.t(`${NotificationType.ERROR_WALLET_NAME_ALREADY_EXISTS}`)}`,
    })

    extend('privateKey', {
      validate(value) {
        try {
          Account.createFromPrivateKey(value, NetworkType.MIJIN_TEST)
          return true
        }
        catch (e) {}
        return false 
      },
      message: `${i18n.t(`${NotificationType.ACCOUNT_NAME_EXISTS_ERROR}`)}`,
    })
  
    extend('addressOrPublicKey', {
      validate: (value) => {
        const isValidAddress = AddressValidator.validate(value)
        const isValidPublicKey = PublicKeyValidator.validate(value)
        if (isValidAddress || isValidPublicKey) return true
        return false
      },
      message: `${i18n.t('incorrect_field_error')}`,
    })
  }
}

