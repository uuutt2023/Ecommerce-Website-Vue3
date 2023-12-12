import { defineRule } from 'vee-validate';

defineRule('required', (value) => (value && value.trim() ? true : '不能为空'));
defineRule('minLength', (value, [len]) => (value && value.length >= len ? true : `请输入 ${len} 个及以上的字符`));
