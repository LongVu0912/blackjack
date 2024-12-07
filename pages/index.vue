<script setup lang="ts">
import type { Card } from '~/types/interface/Card';
import type { Cases } from '~/types/interface/Cases';

const deck = useDeckState();
const deckRepository = DeckRepository();
const allCards = deckRepository.initDeck();

const playerPoint = ref(0);
const cases = ref<Cases>({} as Cases);

const addCardModal = ref({
    isOpen: false,
})

const removeCardModal = ref({
    isOpen: false,
})

onBeforeMount(() => {
    newMatch();
})

watch(deck.value, () => {
    console.log(deck.value);
    playerPoint.value = deckRepository.countPlayerPoint();
    cases.value = deckRepository.countCases();
});

const newMatch = () => {
    deckRepository.initDeck();
}

const pickRandomCard = () => {
    deckRepository.pickRandomCard();
    playerPoint.value = deckRepository.countPlayerPoint();
    cases.value = deckRepository.countCases();
}

const openAddCardModal = () => {
    addCardModal.value.isOpen = true;
}

const closeAddCardModal = () => {
    addCardModal.value.isOpen = false;
}

const openRemoveCardModal = () => {
    removeCardModal.value.isOpen = true;
}

const closeRemoveCardModal = () => {
    removeCardModal.value.isOpen = false;
}

const addACard = (card: Card) => {
    if (!showedCardSet.value.has(`${card.name}${card.suit}`)) {
        deckRepository.addACard(card);
    }
}

const removeACard = (card: Card) => {
    if (!showedCardSet.value.has(`${card.name}${card.suit}`)) {
        deckRepository.removeACard(card);
    }
}

const showedCardSet = computed(() => {
    return new Set([...deck.value.playerCards.map(card => `${card.name}${card.suit}`), ...deck.value.openedCards.map(card => `${card.name}${card.suit}`)]);
});
</script>

<template>
    <div class="mb-4 flex justify-center space-x-2">
        <UButton @click="newMatch" label="Ván mới" />
        <UButton @click="pickRandomCard" label="Bốc ngẫu nhiên" />
    </div>

    <div class="flex w-full flex-col items-center justify-center gap-4">
        <div class="flex flex-row items-center gap-8">
            <div class="relative cursor-pointer select-none" @click="openAddCardModal">
                <img class="h-48 opacity-60" src="/cards/blue_back.png" />
                <div class="absolute inset-0 flex items-center justify-center text-3xl font-bold text-gray-800">
                    {{ deck.cards.length }}
                </div>
            </div>
            <div class="relative cursor-pointer select-none" @click="openRemoveCardModal">
                <img class="h-48 opacity-60" src="/cards/red_back.png" />
                <div class="absolute inset-0 flex items-center justify-center text-3xl font-bold text-gray-800">
                    {{ deck.openedCards.length }}
                </div>
            </div>
        </div>

        <div class="flex flex-col items-center gap-2">
            <div class="text-primary-500 dark:text-primary-400 text-4xl font-bold">
                {{ playerPoint }}
            </div>

            <div class="flex flex-row gap-4">
                <div v-for="point in [16, 17, 18, 19, 20, 21]" :key="point"
                     class="flex flex-row flex-wrap items-end gap-1 text-2xl">
                    <div class="font-bold">{{ point }}:</div>
                    <div class="text-primary-500 dark:text-primary-400 text-xl font-medium">
                        {{ cases[point as keyof Cases] }}%
                    </div>
                </div>
            </div>

            <div class="flex flex-row gap-4 text-2xl">
                <div class="flex flex-row items-end gap-2">
                    <div class="font-bold">An toàn:</div>
                    <div class="text-xl font-medium text-green-500 dark:text-green-400">
                        {{ 100 - cases[22] }}%
                    </div>
                </div>

                <div class="flex flex-row items-end gap-2">
                    <div class="font-bold">Quắc:</div>
                    <div class="text-xl font-medium text-red-500 dark:text-red-400">
                        {{ cases[22] }}%
                    </div>
                </div>
            </div>
        </div>

        <div class="grid w-full grid-cols-3 items-center justify-center gap-1 lg:flex lg:flex-wrap lg:justify-center">
            <img class="h-48 w-auto" :src="'/cards/' + (card.name + card.suit) + '.png'"
                 v-for="(card, cardIndex) in deck.playerCards"
                 :key="cardIndex" />
        </div>
    </div>

    <UModal :ui="{ width: 'sm:max-w-full' }" v-model="addCardModal.isOpen" prevent-close>
        <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex items-center justify-between">
                    <div class="text-base font-semibold">
                        Thêm bài
                    </div>
                    <UButton color="gray" variant="ghost" icon="mingcute:close-fill" class="-my-1"
                             @click="closeAddCardModal" />
                </div>
            </template>

            <div class="grid w-full grid-cols-4 items-center justify-center gap-1 lg:grid-cols-13">
                <img class="h-auto w-full" :src="'/cards/' + (card.name + card.suit) + '.png'"
                     v-for="(card, cardIndex) in allCards"
                     :class="{ 'opacity-40 cursor-not-allowed': showedCardSet.has(card.name + card.suit), 'cursor-pointer': !showedCardSet.has(card.name + card.suit) }"
                     :key="cardIndex" @click="addACard(card)" />
            </div>
        </UCard>
    </UModal>

    <UModal :ui="{ width: 'sm:max-w-full' }" v-model="removeCardModal.isOpen" prevent-close>
        <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex items-center justify-between">
                    <div class="text-base font-semibold">
                        Bỏ bài
                    </div>
                    <UButton color="gray" variant="ghost" icon="mingcute:close-fill" class="-my-1"
                             @click="closeRemoveCardModal" />
                </div>
            </template>

            <div class="grid w-full grid-cols-4 items-center justify-center gap-1 lg:grid-cols-13">
                <img class="h-auto w-full" :src="'/cards/' + (card.name + card.suit) + '.png'"
                     v-for="(card, cardIndex) in allCards"
                     :class="{ 'opacity-40 cursor-not-allowed': showedCardSet.has(card.name + card.suit), 'cursor-pointer': !showedCardSet.has(card.name + card.suit) }"
                     :key="cardIndex" @click="removeACard(card)" />
            </div>
        </UCard>
    </UModal>
</template>