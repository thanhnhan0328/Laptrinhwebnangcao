"use client";

import React, { useEffect, useState } from "react";
import { Table, Card, Typography, Button, message } from "antd";

const { Title } = Typography;

interface Category {
  category_id: number;
  category_name: string;
  product_count: number;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories"); // API giả định
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        message.error("Lỗi khi tải danh mục sản phẩm!");
      }
    };

    fetchCategories();
  }, []);

  const columns = [
    {
      title: "Mã danh mục",
      dataIndex: "category_id",
      key: "category_id",
    },
    {
      title: "Tên danh mục",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "Số lượng sản phẩm",
      dataIndex: "product_count",
      key: "product_count",
    },
  ];

  return (
    <Card title="Danh mục sản phẩm" style={{ maxWidth: "1200px", margin: "auto", marginTop: "20px" }}>
      {categories.length > 0 ? (
        <Table dataSource={categories} columns={columns} rowKey="category_id" pagination={false} />
      ) : (
        <Title level={4} style={{ textAlign: "center", color: "gray" }}>
          Không có danh mục nào!
        </Title>
      )}
    </Card>
  );
}
