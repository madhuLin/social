<script setup>
import { onMounted, ref } from 'vue';
import useWeb3 from "../hooks/useWeb3.js";
import { useRouter } from 'vue-router';
import { signUpApi } from "../api/login_signUp.js";
const router = useRouter();
const {web3, socialContract, getAccount, contractAddress} = useWeb3();
const email = ref('');
const password = ref('');
const username = ref('');
const ethereumAddress = ref('');

function connectMetaMask() {
    if (window.ethereum) {
        console.log('MetaMask 已安裝');  
        console.log(getAccount);
        // 檢查使用者是否已經登入了 MetaMask
        if (window.ethereum.selectedAddress) {
            ethereumAddress.value = window.ethereum.selectedAddress;
            // console.log('使用者已登入 MetaMask，目前帳號位址為:', window.ethereum.selectedAddress);
        } else {
            alert('請先登入 MetaMask');
        }
    } else {
        alert('未偵測到 MetaMask，請先安裝!');
    }
}
onMounted(async () => {
    // const account = await getAccount();
    // console.log(account);
});




const registerUser = async (username) => {
  console.log("registerUser", username);
  const account = await getAccount();
  const transactionParameters = {
    from: account,
    to: contractAddress,
    value: "0",
    data: socialContract.methods.registerUser(username).encodeABI(),
    // gas: web3.utils.toHex(30000),
  };
  try {
    const transactionHash = await ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    console.log("交易已提交，交易哈希:", transactionHash);
    return true;
    // 可以添加額外的邏輯處理，例如等待交易確認或處理交易回執等
  } catch (error) {
    console.error("發送交易時出錯:", error);
    return false;
  }
};

// 提交表單
const submitForm = async () => {
    // 驗證電子郵件地址格式
    if (!isValidEmail(email.value)) {
        alert('Please enter a valid email address.');
        return;
    }

    // 驗證密碼長度
    if (password.value.length < 6) {
        alert('Password must be at least 6 characters long.');
        password.value = '';
        return;
    }

    // 驗證使用者名稱不為空
    if (!username.value.trim()) {
        alert('Please enter a username.');
        return;
    }
    //
    if (username.value > 20) {
        alert('用戶名需小於20字.');
        return;
    }

    // 驗證以太幣地址不為空
    if (!ethereumAddress.value.trim()) {
        alert('Please enter an Ethereum address.');
        ethereumAddress.value = '';
        return;
    }
    // const sepoliaWS = import.meta.env.ETHEREUM_Network_ENDPOINT;
    // const web3 = new Web3(Web3.givenProvider || sepoliaWS);
    if (!web3.utils.isAddress(ethereumAddress.value)) {
        alert('Ethereum address 無效!');
        return;
    }


    // try {
        // const data = new URLSearchParams();
        // data.append('email', email.value);
        // data.append('address', ethereumAddress.value);
        // data.append('username', username.value);
        // data.append('password', password.value);
        // console.log("data", data);
        const data = {
            email : email.value,
            address: ethereumAddress.value,
            username: username.value,
            password: password.value,
        }
        console.log(data);


        
        const res = await signUpApi(data);
        

        if (res.data.code === 1) {
            // 如果請求成功
            console.log("註冊成功!");
            const isResgister = await registerUser(username.value);
            if(!isResgister) {
                alert("交易失敗");
                return;
            }
            router.push('/login');
        } else {
            // 如果請求失敗，列印錯誤訊息
            alert("請求出錯: " + res.data.msg);
        }
    // } catch (err) {
    //     console.error("請求出錯:", err.message);
    // }

    console.log('Form submitted!');

};

// 驗證電子郵件地址格式的函數
const isValidEmail = (email) => {
    // 使用正規表示式驗證電子郵件地址格式
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};
</script>

<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-10 w-auto" src="..\assets\img\logo2.png" alt="Your Company" />
            <h2 class="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">創建一個新帳戶</h2>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
            <form @submit.prevent="submitForm" class="space-y-6" action="#" method="POST">
                <div>
                    <label for="email" class="block text-sm font-semibold leading-6 text-gray-900">Email</label>
                    <div class="mt-2">
                        <input v-model="email" id="email" name="email" type="email" autocomplete="email" required=""
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2" />
                    </div>
                </div>
                <div class="sm:col-span-2">
                    <div class="flex justify-between">
                        <label for="ethereumAddress" class="text-sm font-semibold leading-6 text-gray-900">

                            Ethereum Address</label>
                        <button @click="connectMetaMask"
                            class="ml-2 px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">連接錢包</button>
                    </div>

                    <div class="mt-2.5">
                        <textarea name="ethereumAddress" id="ethereumAddress" rows="4"
                            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            readonly v-model="ethereumAddress" />
                    </div>

                </div>

                <div>
                    <label for="username" class="block text-sm font-semibold leading-6 text-gray-900">用戶名稱</label>
                    <div class="mt-2">
                        <input v-model="username" id="username" name="username" type="text" autocomplete="username"
                            required=""
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2" />
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password"
                            class="block text-sm font-semibold leading-6 text-gray-900">Password</label>
                    </div>
                    <div class="mt-2">
                        <input v-model="password" id="password" name="password" type="password"
                            autocomplete="current-password" required=""
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2" />
                    </div>
                </div>



                <div>
                    <button type="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        登入</button>
                </div>
            </form>

            <p class="mt-8 text-center text-sm text-gray-500">
                已經有帳號了嗎?
                {{ ' ' }}
                <router-link to="login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign in</router-link>
            </p>
        </div>
    </div>
</template>

<style lang="less"></style>