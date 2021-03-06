<template>
    <div>
        <FormWrapper class="general-settings-container" :whitelisted="true">
            <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
                <form class="form-container mt-3" onsubmit="event.preventDefault()" autocomplete="off">
                    <FormRow>
                        <template v-slot:label> {{ $t('form_label_language') }}: </template>
                        <template v-slot:inputs>
                            <div class="inputs-container">
                                <LanguageSelector v-model="formItems.language" :auto-submit="false" :default-form-style="true" />
                            </div>
                        </template>
                    </FormRow>

                    <FormRow>
                        <template v-slot:label> {{ $t('form_label_default_max_fee') }}: </template>
                        <template v-slot:inputs>
                            <div class="inputs-container select-container">
                                <MaxFeeSelector v-model="formItems.defaultFee" />
                            </div>
                        </template>
                    </FormRow>

                    <ExplorerUrlSetter v-model="formItems.explorerUrl" :auto-submit="false" />

                    <FormRow>
                        <template v-slot:label> {{ $t('form_label_default_account') }}: </template>
                        <template v-slot:inputs>
                            <div class="inputs-container select-container">
                                <AccountSelectorField v-model="formItems.defaultAccount" :default-form-style="true" :show-icon="false" />
                            </div>
                        </template>
                    </FormRow>

                    <div class="form-row form-submit">
                        <button class="button-style inverted-button pl-2 pr-2" type="submit" @click="handleSubmit(onSubmit)">
                            {{ $t('confirm') }}
                        </button>
                        <button class="button-style button danger-button pl-2 pr-2" type="reset" @click.prevent="resetForm">
                            {{ $t('reset') }}
                        </button>
                    </div>
                </form>
            </ValidationObserver>
        </FormWrapper>

        <ModalFormProfileUnlock
            v-if="hasAccountUnlockModal"
            :visible="hasAccountUnlockModal"
            :on-success="onAccountUnlocked"
            @close="hasAccountUnlockModal = false"
        />
    </div>
</template>

<script lang="ts">
import { FormGeneralSettingsTs } from './FormGeneralSettingsTs';
export default class FormGeneralSettings extends FormGeneralSettingsTs {}
</script>

<style lang="less" scoped>
.general-settings-container {
    display: block;
    width: 100%;
    clear: both;
    min-height: 1rem;
    padding-top: 0.8rem;
    padding-bottom: 0.4rem;
}

.form-submit {
    display: flex;
    padding-top: 5%;
    padding-right: 17%;
    flex-flow: row-reverse;

    button[type='reset'] {
        margin-right: 35px;
    }
}

/deep/ .form-row {
    .form-row-inner-container {
        grid-template-columns: none !important;
    }
    .inputs-container {
        margin-top: 0.05rem;
        padding-left: 0.35rem;
        margin-bottom: 0.1rem;
        padding-right: 0.85rem;
    }
}
</style>
