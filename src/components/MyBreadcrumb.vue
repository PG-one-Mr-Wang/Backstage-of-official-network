<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item> {{level1}} </el-breadcrumb-item>
    <el-breadcrumb-item> {{level2}} </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script type="text/javascript">
export default{
  name: 'MyBreadcrumb',
  props: ['level1', 'level2']
}
</script>

<style type="text/css">

</style>

