<template>
    <component :is="renderIcon" />
</template>

<script lang="ts">
import { defineComponent, h } from 'vue';
import type { Component, VNode } from 'vue';
import * as icons from '@ant-design/icons-vue';

export type IconName = keyof typeof icons;
export default defineComponent({
    name: 'DynamicIcon',
    props: {
        iconName: {
            type: String as () => IconName,
            required: true,
            validator: (value: string) => {
                return value in icons;
            }
        },
        iconProps: {
            type: Object,
            default: () => ({})
        },
        color: {
            type: String,
            default: undefined
        },
        size: {
            type: [Number, String],
            default: undefined
        }
    },
    setup(props) {
        const renderIcon = (): VNode | null => {
            const IconComponent = icons[props.iconName] as Component;

            if (!IconComponent) {
                console.warn(`[DynamicIcon] 图标 "${props.iconName}" 不存在`);
                return null;
            }
            const style = {
                ...(props.color && { color: props.color }),
                ...(props.size && { fontSize: `${props.size}${typeof props.size === 'number' ? 'px' : ''}` }),
                ...props.iconProps?.style
            };

            return h(IconComponent, {
                ...props.iconProps,
                style
            });
        };

        return { renderIcon };
    }
});
</script>