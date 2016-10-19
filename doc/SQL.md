# 常用关键字
* SELECT : 选择字段, 也可用于计算和函数
* FROM : 选择表
* DISTINCT : 返回不同的值(过滤重复的值), 在列名前面
* ORDER BY : 排序, 应该出现在末尾
* DESC : 降序
* ASC : 升序
* WHERE : 过滤行, 应在 ORDER BY 之前
* BETWWEN : 在两个值之间
* IS NULL : 为 NULL 值
* AND : 与
* OR : 或
* IN : 指定条件范围, 类似枚举, IN ('a', 'b')
* NOT : 否定
* LIKE : 通配符搜索
* % : 任意字符出现任意次数
* _ : 匹配单个字符
* [] : 匹配字符集
* ^ : 否定匹配
* 计算字段 : 使用 + 或 || 拼接
* AS : 别名
* GROUP BY : 分组, 在 WHERE 之后, ORDER BY 之前
* HAVING : 过滤分组
* INNER JOIN : 内联结|等值联结
* ON : 联结的条件
* LEFT OUTER JOIN : 左外联结
* UNION : 组合查询
* UNION ALL : 组合查询, 不去重复
* INSERT INTO : 插入
* VALUES :　要插入的值
* SELECT INTO :　复制导入表
* UPDATE : 更新
* SET : 设置值
* DELETE FROM : 删除
* CREATE TABLE : 创建表
* DEFAULT : 默认值
* ALTER TABLE : 更新表定义
* DROP TABLE : 删除表
* 视图 : 虚拟的表
* CREATE VIEW : 创建视图
* DROP VIEW : 删除视图
* EXECUTE : 执行存储过程
* ROLLBACK : 回退(撤销)SQL语句
* COMMITT : 提交(保存)更改
* SAVEPOINT : 保留点
* DECLARE :　创建游标
* OPEN CURSOR : 打开游标
* FETCH : 访问游标数据
* CLOSE : 关闭游标
* PRIMARY KEY : 主键
* REFERENCES : 外键
* CHECK : 检查约束
* CREATE INDEX : 创建索引
* CREATE TRIGGER : 创建触发器


# SELECT 子句顺序
* SELECT
* FROM
* WHERE
* GROUP BY
* HAVING
* ORDER BY

# 联结的类型
* 内联结
* 自联结
* 自然联结
* 外联结

