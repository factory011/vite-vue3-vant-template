# Vue 3 + Vite + Vant

This todoMvc template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## create database && connect
/*
 Navicat Premium Data Transfer

 Source Server         : 本机环境
 Source Server Type    : MySQL
 Source Server Version : 80028
 Source Host           : localhost:3306
 Source Schema         : todo

 Target Server Type    : MySQL
 Target Server Version : 80028
 File Encoding         : 65001

 Date: 28/02/2023 21:38:57
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for list
-- ----------------------------
DROP TABLE IF EXISTS `list`;
CREATE TABLE `list`  (
  `rowId` int NOT NULL AUTO_INCREMENT,
  `label` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `checked` tinyint NULL DEFAULT NULL,
  PRIMARY KEY (`rowId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 63 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of list
-- ----------------------------
INSERT INTO `list` VALUES (62, '去吃炸鸡', 1);
INSERT INTO `list` VALUES (63, '去吃冰淇淋', 0);

SET FOREIGN_KEY_CHECKS = 1;

## run
### yarn install

### yarn build

### nodemon .\server.js

### http://localhost:5173/#/

![image.png](https://github.com/factory011/perFileServer/blob/main/Other/todos.png?raw=true)