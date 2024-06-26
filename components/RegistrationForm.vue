<template>
  <div id="registration" class="post-user">
    <h1 class="post-user--title" >Working with POST request</h1>
    <div class="post-user--form" >
        <UiInput
          class="post-user--form_input"
          v-model="name"
          placeholder="Your name"
          :error="!isValidName"
          :errorText="nameError"
          label="Name"
        />
        <UiInput
          class="post-user--form_input"
          v-model="email"
          placeholder="Email"
          :error="!isValidEmail"
          :errorText="emailError"
          label="Email"
        />
        <UiInput
          class="post-user--form_input"
          v-model="phone"
          placeholder="Phone"
          :error="!isValidPhone"
          :errorText="phoneError"
          helperText="+38 (XXX) XXX - XX - XX"
          label="Phone"
        />

        <div class="post-user--form_position-group">
          <p>Select your position</p>
          <UiLoader v-if="isLoading" />
          <div v-for="position in positions" :key="position.id">
            <UiRadioButton
              v-model="selectedPosition"
              :value="position.name"
              :label="position.name"
              @click="position_id = position.id"
            />
          </div>
        </div>

        <div class="post-user--form_upload-file">
          <UiUpload
            v-model="file"
            label="Upload"
            placeholder="Upload your photo"
            :error="!isValidFile"
            :errorText="fileError"
            @update="fileUpdate"
          />
        </div>

        <UiButton :disabled="!isFormValid" @click.prevent="handleSubmit"> <span @click="scrollTo('users')">Sign up</span>  </UiButton>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import type { IPosition } from "@/types/position.type";
import { validateName, validateEmail, validatePhone, validateFile,} from "~/utils/validation"
const { $api, $toast } = useNuxtApp()
const emit = defineEmits(['user-registered']);

let name = ref("Taras Shevchenko") //watcher for dynamic first_letter to Uppercase
const email = ref("kobzar@gmail.com")
const phone = ref("+380995004040")
// let name = ref("") //watcher for dynamic first_letter to Uppercase
// const email = ref("")
// const phone = ref("")
const file = ref<File | null>(null)
const selectedPosition = ref("")
const position_id  = ref<number>(0)
const positions = ref<IPosition[]>([])
let isLoading = ref(true)




const isValidName = computed(() => validateName(name.value).rules)
const nameError = computed(() => validateName(name.value).error())

const isValidEmail = computed(() => validateEmail(email.value).rules)
const emailError = computed(() => validateEmail(email.value).error())

const isValidPhone = computed(() => validatePhone(phone.value).rules)
const phoneError = computed(() => validatePhone(phone.value).error())

const fileUpdate = computed(() => {
  if(file.value) {
    validateFile(file.value).then(( valid: any  )=> {
      isValidFile.value = valid.rules
      fileError.value = valid.error()
    })
  }
})
const isValidFile = ref(false)
const fileError = ref('')

watch(name, (newName) => {
  if (newName) { name.value = newName.charAt(0).toUpperCase() + newName.slice(1) }
})

const isFormValid = computed( () =>
    isValidName.value &&
    isValidEmail.value &&
    isValidPhone.value &&
    selectedPosition.value &&
    isValidFile.value
);

const handleSubmit = async () => {
  if (isFormValid.value) {
    let token = ''
    let formData = new FormData();
    formData.append("name", name.value);
    formData.append("email", email.value);
    formData.append("phone", phone.value);
    formData.append("position_id", position_id.value.toString() );
    formData.append("photo", file.value  as File );

    await $api('/token')
      .then(function(response) { 
        token = response.data.token
      })
      .catch(function(error) {  })

    await $api.post("/users", formData, {
      headers: {
        'Token': token,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      $toast(response.data.message, "success")
      emit('user-registered')
    })
    .catch(error => {
      if (error.response) {
        const errors = error.response.data.fails
        const err = error.response.data.message
        for( const err in errors ) {
          $toast(errors[err][0], "error")
        }
        $toast(err, "error")
      }
    })

  }
};

const loadPositions = async () => {
  try {
    const { data } = await $api(`/positions`)
    if(data.success) {
      positions.value.push(...data.positions)
      isLoading.value = false
      if (positions.value.length > 0) {
        selectedPosition.value = positions.value[0].name
        position_id.value = positions.value[0].id
      }
    } 
  } catch (error) {
    $toast((error as Error).message, "error")
 }  
};

onMounted(() => loadPositions())
</script>

<style  lang="scss" scoped>
.post-user {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 100px;

  &--title {
    text-align: center;
    font-weight: 100;
    margin-bottom: 50px;
  }

  &--form {
    display: flex;
    flex-direction: column;

    &_input {
      margin-bottom: 50px;
    }

    &_position-group {
      width: 100%;
      margin-bottom: 50px;
    }

    &_upload-file {
      margin-bottom: 50px;
      width: 100%;
    }
  }
}

</style>
