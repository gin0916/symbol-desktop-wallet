<template>
    <div class="accounts-main-container">
        <div class="left-container">
            <div class="left-top-container">
                <div class="account-switch-container">
                    <NavigationLinks
                        :direction="'horizontal'"
                        :items="panelItems"
                        :current-item-index="activePanel"
                        translation-prefix="tab_accounts_"
                        @selected="(i) => (activePanel = i)"
                    />
                    <AccountSelectorPanel v-if="activePanel === 0" />
                    <ContactSelectorPanel v-if="activePanel === 1" />
                </div>
            </div>
            <div class="left-bottom-container">
                <!--TODO: Display hidden accounts following AccountSelectorPanel style.-->
                <div class="hidden-account-header">
                    <h1 class="section-title">
                        {{ $t('hidden_accounts') }}
                    </h1>
                </div>
            </div>
        </div>
        <div v-if="activePanel === 0" class="right-container">
            <div class="header-container">
                <NavigationTabs direction="horizontal" :parent-route-name="parentRouteName" />
            </div>

            <div class="bottom-container">
                <router-view />
            </div>
        </div>
        <div v-if="activePanel === 1" class="right-container">
            <div class="header-container">
                <div class="tabs horizontal">
                    <span class="tab-item active">{{ $t('contact_information') }}</span>
                </div>
            </div>
            <div class="bottom-container">
                <ContactDetailPanel />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { AccountsTs } from './AccountsTs';
export default class Accounts extends AccountsTs {}
</script>

<style lang="less" scoped>
@import './Accounts.less';

.hidden-account-header {
    padding: 0 0.4rem;
    margin: 0.2rem 0;
    .section-title {
        font-weight: 600;
        color: @purpleDark;
        font-family: @symbolFont;
    }
}

.account-switch-container {
    display: grid;
    height: 100%;
    grid-template-rows: 0.6rem auto;
}
</style>
