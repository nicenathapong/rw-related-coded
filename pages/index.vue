<template>
    <div class="container max-w-[1024px] mx-auto">
        <div class="flex min-h-screen">
            <div class="m-auto">
                <div>
                    <div class="text-center text-white mb-12">
                        <h1 class="text-4xl font-semibold mb-1 animate__animated animate__fadeIn">พี่รหัสตึงปุ้มปุ้ย</h1>
                        <p class="text-gray-400 animate__animated animate__fadeIn animate__delay-1s">ธุรกิจ-เทคโน | 5/17 - 4/16</p>
                    </div>
                    <div class="bg-gray-800 text-white p-4 py-6 w-[300px] rounded-lg animate__animated animate__fadeInUp">
                        <div v-if="isSuccess" class="mb-6">
                            <h1 v-if="isSuccess" class="animate__animated animate__fadeIn animate__delay-1s">สวัสดี! <span class="font-semibold text-lg">{{ name }}</span></h1>
                            <p v-if="isSuccess" class="text-sm text-gray-400 mb-4 animate__animated animate__fadeIn animate__delay-2s" >พี่รหัสของคุณ มีทั้งหมด <span class="text-white font-semibold">{{ count.toLocaleString() }}</span> คน</p>

                            <div class="text-center">
                                <p class="text-2xl font-semibold animate__animated animate__fadeIn animate__delay-3s">คำใบ้</p>
                                <p v-for="hint in hints" :key="hint" class="animate__animated animate__fadeIn animate__delay-5s">
                                    {{ hint }}
                                    <span v-if="hints[hints.indexOf(hint) + 1]" class="text-gray-400 text-sm"> และ </span>
                                </p>
                            </div>
                            
                        </div>

                        <div v-if="!isSuccess" class="text-center mb-6">
                            <h1>คำใบ้ของพี่รหัสคุณ คืออะไรน้า?</h1>
                        </div>

                        <form @submit.prevent="handleFormSubmit">
                            <div class="mb-2">
                                <input
                                    type="text"
                                    v-model="id_student"
                                    name="id"
                                    class="block w-full p-2.5 bg-gray-700 focus:bg-gray-700 border border-gray-500 text-sm rounded-md"
                                    placeholder="กรอกรหัสนักเรียน"
                                    required
                                />
                            </div>
                            <div class="text-right">
                                <button
                                    type="submit"
                                    class="bg-gray-700 hover:bg-gray-600 py-1 px-4 rounded shadow"
                                >
                                    ดูคำใบ้
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2';
import 'animate.css';

export default {
    data() {
        return {
            id_student: '',
            isSuccess: false,
            name: '',
            count: 0,
            hints: [],
        }
    },
    methods: {
        async handleFormSubmit(event) {
            this.isSuccess = false;
            
            const { data, isError } = await axios
                .get(`/api/hint?id=${this.id_student}`)
                .then((res) => ({ isError: false, data: res.data }))
                .catch((err) => ({ isError: true, data: err.response.data }))

            if (isError) {
                return Swal.fire({
                    icon: 'error',
                    text: data.message
                });
            }

            this.name = data.hint.name
            this.count = data.hint.hints.length;
            this.hints = data.hint.hints;
            // this.hint = data.hint.hints.map(_ => `" ${_} "`).join(" และ ");
            this.isSuccess = true;
        },
    },
}
</script>
