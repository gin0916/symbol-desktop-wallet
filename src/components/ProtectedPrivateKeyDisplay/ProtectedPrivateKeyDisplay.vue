<template>
    <div class="account-detail-row-3cols">
        <span class="label">{{ $t('private_key') }}:</span>
        <div v-if="hasPlainPrivateKey" class="value">
            {{ plainInformation }}
            <ButtonCopyToClipboard v-model="plainInformation">
                <img src="@/views/resources/img/account/copyIcon.png" class="copy-icon" />
            </ButtonCopyToClipboard>
            <span class="timer-span"> &nbsp; ({{ $t('x_seconds', { seconds: secondsCounter }) }})</span>
        </div>
        <div v-else>
            <div class="value">
                <button type="button" class="show-button" @click="onClickDisplay">
                    {{ $t('show_button') }}
                </button>
            </div>
        </div>

        <ModalFormProfileUnlock
            v-if="hasAccountUnlockModal"
            :visible="hasAccountUnlockModal"
            :on-success="onAccountUnlocked"
            @close="hasAccountUnlockModal = false"
        />
    </div>
</template>

<script>
import { ProtectedPrivateKeyDisplayTs } from './ProtectedPrivateKeyDisplayTs';
export default class ProtectedPrivateKeyDisplay extends ProtectedPrivateKeyDisplayTs {}
</script>

<style lang="less" scoped>
@import './../../views/resources/css/variables.less';

.show-button {
    border: none !important;
    font-weight: bold;
    cursor: pointer;
    background-color: transparent;
    color: @purpleLightest;
}

.copy-icon {
    width: 0.24rem;
    height: 0.24rem;
    margin-left: 0.18rem;
    cursor: pointer;
}
.eye-button {
    height: 0.35rem !important;
    padding: 0 0.3rem;
}

.value {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: max-content;
}

.timer-span {
    padding-left: 8px;
}
</style>
