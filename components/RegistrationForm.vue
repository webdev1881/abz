<script setup lang="ts">
import { ref, computed } from "vue"
import type { IPosition } from "@/types/position.type"
import { validateName, validateEmail, validatePhone, validateFile,} from "~/utils/validation"
const { $api, $toast } = useNuxtApp()
const emit = defineEmits(['user-registered']);
useSeoMeta({title: 'abz',})

interface RegistrationFormProps { newUser: boolean}
const props = defineProps<RegistrationFormProps>()

let name = ref("") //watcher for dynamic first_letter to Uppercase
const email = ref("")
const phone = ref("")
const file = ref<File | null>(null)
const selectedPosition = ref("")
const position_id  = ref<number>(0)
const positions = ref<IPosition[]>([])
let isLoadingPositions = ref(true)
let isLoadResponce = ref(false)
let isSuccess = ref(false)

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
watch(() => props.newUser, () => {
  isSuccess.value = false
});

const isFormValid = computed( () =>
    isValidName.value &&
    isValidEmail.value &&
    isValidPhone.value &&
    selectedPosition.value &&
    isValidFile.value
);

const clearForm = () => {
  name.value = ''
  email.value = ''
  phone.value = ''
  file.value = null
}

const handleSubmit = async () => {
  if (isFormValid.value) {
    let token = ''
    let formData = new FormData();
    formData.append("name", name.value);
    formData.append("email", email.value);
    formData.append("phone", phone.value);
    formData.append("position_id", position_id.value.toString() );
    formData.append("photo", file.value  as File );
    isLoadResponce.value = true
    isSuccess.value = true

    // get token from server
    await $api('/token')
      .then(function(response) { 
        token = response.data.token
      })
      .catch(function(error) {  })
      
    // send data to server
    await $api.post("/users", formData, {
      headers: {
        'Token': token,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      // isSuccess.value = true
      isLoadResponce.value = false
      $toast(response.data.message, "success")
      emit('user-registered')
      clearForm()
    })
    .catch(error => {
      if (error.response) {
        isLoadResponce.value = false
        isSuccess.value = false
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
      isLoadingPositions.value = false
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

<template>
  <div id="registration" class="post-user">
    <h1 v-if="!isSuccess" class="post-user--title" >Working with POST request</h1>
    <UiLoader v-if="isLoadResponce" />
    <div v-if="!isSuccess" class="post-user--form" >
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

        <div class="post-user--form_positions">
          <p class="form_positions_title" >Select your position</p>
          <UiLoader v-if="isLoadingPositions" />
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

        <UiButton
          class="post-user--form_submit"
          :disabled="!isFormValid" 
          @click.prevent="handleSubmit"
        >Sign up</UiButton>

    </div>

    <div v-if="!isLoadResponce && isSuccess" class="post-user--success">
      <h1 class="post-user--success_title">User successfully registered</h1>
      <img src="@/assets/img/success.jpg" format="webp" quality="40" alt="" class="post-user--success_img"/>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.post-user {
  position: relative;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 50px;

  &--title {
    text-align: center;
    font-weight: 100;
    margin-bottom: 50px;
    margin: 0;
    margin-bottom: 50px;
  }

  &--form {
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;

    &_input {
      margin-bottom: 50px;
    }    

    &_positions {
      width: 100%;
      margin-bottom: 40px;
      .form_positions_title {
        margin-top: -7px;
        margin-bottom: 10px;
      }
    }

    &_upload-file {
      margin-bottom: 50px;
      width: 100%;
    }

    &_submit {
      margin: 0 auto;
    }
  }

  &--success {
    display: flex;
    flex-direction: column;

    &_title {
      width: 505px;
      text-align: center;
      font-weight: 100;
      margin-bottom: 50px;
    }
  }
}

</style>
