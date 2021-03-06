USE [master]
GO
/****** Object:  Database [takip2]    Script Date: 18.02.2018 01:48:18 ******/
CREATE DATABASE [takip2]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'takip2', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.SQLEXPRESS\MSSQL\DATA\takip2.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'takip2_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.SQLEXPRESS\MSSQL\DATA\takip2_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [takip2] SET COMPATIBILITY_LEVEL = 130
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [takip2].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [takip2] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [takip2] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [takip2] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [takip2] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [takip2] SET ARITHABORT OFF 
GO
ALTER DATABASE [takip2] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [takip2] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [takip2] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [takip2] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [takip2] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [takip2] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [takip2] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [takip2] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [takip2] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [takip2] SET  DISABLE_BROKER 
GO
ALTER DATABASE [takip2] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [takip2] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [takip2] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [takip2] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [takip2] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [takip2] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [takip2] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [takip2] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [takip2] SET  MULTI_USER 
GO
ALTER DATABASE [takip2] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [takip2] SET DB_CHAINING OFF 
GO
ALTER DATABASE [takip2] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [takip2] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [takip2] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [takip2] SET QUERY_STORE = OFF
GO
USE [takip2]
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
USE [takip2]
GO
/****** Object:  Table [dbo].[bill]    Script Date: 18.02.2018 01:48:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[bill](
	[billId] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](50) NULL,
	[surname] [nvarchar](50) NULL,
	[description] [nvarchar](150) NULL,
	[taxno] [int] NULL,
	[dateSell] [datetime] NULL,
 CONSTRAINT [PK_bill] PRIMARY KEY CLUSTERED 
(
	[billId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[category]    Script Date: 18.02.2018 01:48:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[category](
	[categoryId] [int] IDENTITY(1,1) NOT NULL,
	[categoryName] [nvarchar](50) NULL,
 CONSTRAINT [PK_category] PRIMARY KEY CLUSTERED 
(
	[categoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[categoryValue]    Script Date: 18.02.2018 01:48:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[categoryValue](
	[categoryValueId] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](50) NULL,
	[description] [nvarchar](50) NULL,
	[categoryId] [int] NULL,
 CONSTRAINT [PK_categoryValue] PRIMARY KEY CLUSTERED 
(
	[categoryValueId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[categoryValueProject]    Script Date: 18.02.2018 01:48:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[categoryValueProject](
	[valueId] [int] IDENTITY(1,1) NOT NULL,
	[projectId] [int] NULL,
	[categoryValueId] [int] NULL,
	[statu] [int] NULL,
 CONSTRAINT [PK_categoryValueProject] PRIMARY KEY CLUSTERED 
(
	[valueId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[employee]    Script Date: 18.02.2018 01:48:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[employee](
	[empId] [int] IDENTITY(1000,1) NOT NULL,
	[name] [nvarchar](50) NULL,
	[surname] [nvarchar](50) NULL,
	[entranceDate] [datetime] NULL,
	[number] [nvarchar](15) NULL,
	[mail] [nvarchar](150) NULL,
	[adress] [nvarchar](150) NULL,
	[username] [nvarchar](50) NULL,
	[password] [nvarchar](256) NULL,
	[roleId] [int] NULL,
 CONSTRAINT [PK_employee] PRIMARY KEY CLUSTERED 
(
	[empId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[image]    Script Date: 18.02.2018 01:48:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[image](
	[imageId] [int] IDENTITY(1,1) NOT NULL,
	[image] [nvarchar](250) NULL,
	[projectId] [int] NULL,
	[description] [nvarchar](150) NULL,
 CONSTRAINT [PK_image] PRIMARY KEY CLUSTERED 
(
	[imageId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[member]    Script Date: 18.02.2018 01:48:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[member](
	[memberId] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](50) NULL,
	[surname] [nvarchar](50) NULL,
	[registerDay] [datetime] NULL,
	[number] [nvarchar](20) NULL,
	[mail] [nvarchar](150) NULL,
	[adress] [nvarchar](150) NULL,
	[identityNo] [nvarchar](20) NULL,
	[username] [nvarchar](50) NULL,
	[password] [nvarchar](256) NULL,
	[roleId] [int] NULL,
 CONSTRAINT [PK_member] PRIMARY KEY CLUSTERED 
(
	[memberId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[message]    Script Date: 18.02.2018 01:48:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[message](
	[messageId] [int] NOT NULL,
	[message] [nvarchar](max) NULL,
	[sendtime] [datetime] NULL,
	[projectId] [int] NULL,
	[senderByAdmin] [bit] NULL,
 CONSTRAINT [PK_message] PRIMARY KEY CLUSTERED 
(
	[messageId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[project]    Script Date: 18.02.2018 01:48:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[project](
	[projectId] [int] IDENTITY(1,1) NOT NULL,
	[projectName] [nvarchar](50) NULL,
	[description] [nvarchar](250) NULL,
	[statuId] [int] NULL,
	[memberId] [int] NULL,
	[employeerId] [int] NULL,
	[percentStatu] [int] NULL,
	[startDate] [datetime] NULL,
	[exceptedFinish] [date] NULL,
	[finishDate] [datetime] NULL,
	[saleId] [int] NULL,
	[categoryId] [int] NULL,
	[extra] [nvarchar](250) NULL,
 CONSTRAINT [PK_project] PRIMARY KEY CLUSTERED 
(
	[projectId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[role]    Script Date: 18.02.2018 01:48:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[role](
	[roleId] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](50) NULL,
 CONSTRAINT [PK_role] PRIMARY KEY CLUSTERED 
(
	[roleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[sale]    Script Date: 18.02.2018 01:48:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sale](
	[saleId] [int] IDENTITY(1,1) NOT NULL,
	[price] [money] NULL,
	[hirepurchase] [int] NULL,
	[IsPaidAll] [bit] NULL,
	[billId] [int] NOT NULL,
 CONSTRAINT [PK_sale] PRIMARY KEY CLUSTERED 
(
	[saleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[statu]    Script Date: 18.02.2018 01:48:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[statu](
	[statuId] [int] IDENTITY(1,1) NOT NULL,
	[statuName] [nvarchar](50) NULL,
 CONSTRAINT [PK_statu] PRIMARY KEY CLUSTERED 
(
	[statuId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET IDENTITY_INSERT [dbo].[bill] ON 

INSERT [dbo].[bill] ([billId], [name], [surname], [description], [taxno], [dateSell]) VALUES (1, N'Bulent', N'Avan', N'Proje Bulentt', 21312, CAST(N'2017-07-20T00:00:00.000' AS DateTime))
INSERT [dbo].[bill] ([billId], [name], [surname], [description], [taxno], [dateSell]) VALUES (2, N'Ozgur', N'Ozat', N'Proje Ozgur', 12321, CAST(N'2017-07-20T00:00:00.000' AS DateTime))
INSERT [dbo].[bill] ([billId], [name], [surname], [description], [taxno], [dateSell]) VALUES (1002, N'Google', NULL, N'Otobüs Otomasyon Googlr', 14221, CAST(N'2017-07-20T00:00:00.000' AS DateTime))
INSERT [dbo].[bill] ([billId], [name], [surname], [description], [taxno], [dateSell]) VALUES (1003, N'Microsoft ', NULL, N'Mobil Oyun Microsoft', 12341, CAST(N'2017-07-20T00:00:00.000' AS DateTime))
INSERT [dbo].[bill] ([billId], [name], [surname], [description], [taxno], [dateSell]) VALUES (1004, N'Apple', NULL, N'Satış Otomasyon Apple', 55523, CAST(N'2017-07-20T00:00:00.000' AS DateTime))
INSERT [dbo].[bill] ([billId], [name], [surname], [description], [taxno], [dateSell]) VALUES (1005, N'Muhammed', N'Pak', N'Seo Mami', 66334, CAST(N'2017-07-20T00:00:00.000' AS DateTime))
INSERT [dbo].[bill] ([billId], [name], [surname], [description], [taxno], [dateSell]) VALUES (1010, N'Can', NULL, NULL, NULL, CAST(N'2017-08-10T16:51:03.433' AS DateTime))
INSERT [dbo].[bill] ([billId], [name], [surname], [description], [taxno], [dateSell]) VALUES (1011, N'Can', NULL, NULL, NULL, CAST(N'2017-08-11T16:51:17.417' AS DateTime))
INSERT [dbo].[bill] ([billId], [name], [surname], [description], [taxno], [dateSell]) VALUES (1012, N'Mehmet', NULL, NULL, NULL, CAST(N'2017-09-09T19:52:44.063' AS DateTime))
INSERT [dbo].[bill] ([billId], [name], [surname], [description], [taxno], [dateSell]) VALUES (1013, N'Burcu', NULL, N'Yoık', 1231, CAST(N'2017-09-17T02:11:11.230' AS DateTime))
SET IDENTITY_INSERT [dbo].[bill] OFF
SET IDENTITY_INSERT [dbo].[category] ON 

INSERT [dbo].[category] ([categoryId], [categoryName]) VALUES (1, N'Web')
INSERT [dbo].[category] ([categoryId], [categoryName]) VALUES (2, N'Desktop')
INSERT [dbo].[category] ([categoryId], [categoryName]) VALUES (3, N'Mobile')
INSERT [dbo].[category] ([categoryId], [categoryName]) VALUES (4, N'Gomülü')
INSERT [dbo].[category] ([categoryId], [categoryName]) VALUES (7, N'Seo')
SET IDENTITY_INSERT [dbo].[category] OFF
SET IDENTITY_INSERT [dbo].[categoryValue] ON 

INSERT [dbo].[categoryValue] ([categoryValueId], [name], [description], [categoryId]) VALUES (1, N'Code', N'Web Kod', 1)
INSERT [dbo].[categoryValue] ([categoryValueId], [name], [description], [categoryId]) VALUES (2, N'Design', N'Web Tasarim', 1)
INSERT [dbo].[categoryValue] ([categoryValueId], [name], [description], [categoryId]) VALUES (3, N'Test', N'Web Test', 1)
INSERT [dbo].[categoryValue] ([categoryValueId], [name], [description], [categoryId]) VALUES (4, N'Code', N'Masaustu Kod', 2)
INSERT [dbo].[categoryValue] ([categoryValueId], [name], [description], [categoryId]) VALUES (5, N'Test', N'Masaustu Test', 2)
INSERT [dbo].[categoryValue] ([categoryValueId], [name], [description], [categoryId]) VALUES (6, N'Code', N'Mobil Kod', 3)
INSERT [dbo].[categoryValue] ([categoryValueId], [name], [description], [categoryId]) VALUES (7, N'Design', N'Mobil Tasarim', 3)
INSERT [dbo].[categoryValue] ([categoryValueId], [name], [description], [categoryId]) VALUES (1004, N'Code', N'Seo Kod', 7)
INSERT [dbo].[categoryValue] ([categoryValueId], [name], [description], [categoryId]) VALUES (1005, N'Kod', N'Kod Gömülü', 4)
INSERT [dbo].[categoryValue] ([categoryValueId], [name], [description], [categoryId]) VALUES (1006, N'Test', N'Test Seo', 7)
SET IDENTITY_INSERT [dbo].[categoryValue] OFF
SET IDENTITY_INSERT [dbo].[categoryValueProject] ON 

INSERT [dbo].[categoryValueProject] ([valueId], [projectId], [categoryValueId], [statu]) VALUES (1, 1, 1, 75)
INSERT [dbo].[categoryValueProject] ([valueId], [projectId], [categoryValueId], [statu]) VALUES (2, 1, 2, 15)
INSERT [dbo].[categoryValueProject] ([valueId], [projectId], [categoryValueId], [statu]) VALUES (3, 1, 3, 66)
INSERT [dbo].[categoryValueProject] ([valueId], [projectId], [categoryValueId], [statu]) VALUES (4, 2, 4, 12)
INSERT [dbo].[categoryValueProject] ([valueId], [projectId], [categoryValueId], [statu]) VALUES (5, 2, 5, 44)
INSERT [dbo].[categoryValueProject] ([valueId], [projectId], [categoryValueId], [statu]) VALUES (1002, 1004, 4, 60)
INSERT [dbo].[categoryValueProject] ([valueId], [projectId], [categoryValueId], [statu]) VALUES (1003, 1004, 5, 45)
INSERT [dbo].[categoryValueProject] ([valueId], [projectId], [categoryValueId], [statu]) VALUES (1004, 1005, 4, 55)
INSERT [dbo].[categoryValueProject] ([valueId], [projectId], [categoryValueId], [statu]) VALUES (1005, 1005, 5, 50)
INSERT [dbo].[categoryValueProject] ([valueId], [projectId], [categoryValueId], [statu]) VALUES (1006, 3, 4, 70)
INSERT [dbo].[categoryValueProject] ([valueId], [projectId], [categoryValueId], [statu]) VALUES (1007, 3, 5, 60)
INSERT [dbo].[categoryValueProject] ([valueId], [projectId], [categoryValueId], [statu]) VALUES (1008, 1006, 1004, 80)
INSERT [dbo].[categoryValueProject] ([valueId], [projectId], [categoryValueId], [statu]) VALUES (1009, 1006, 1006, 75)
INSERT [dbo].[categoryValueProject] ([valueId], [projectId], [categoryValueId], [statu]) VALUES (1010, 1008, 6, 100)
INSERT [dbo].[categoryValueProject] ([valueId], [projectId], [categoryValueId], [statu]) VALUES (1011, 1008, 7, 100)
SET IDENTITY_INSERT [dbo].[categoryValueProject] OFF
SET IDENTITY_INSERT [dbo].[employee] ON 

INSERT [dbo].[employee] ([empId], [name], [surname], [entranceDate], [number], [mail], [adress], [username], [password], [roleId]) VALUES (1000, N'Can', N'Avdan', CAST(N'2017-07-20T00:00:00.000' AS DateTime), N'5055065544     ', N'can@gmail.com', N'Can Adress', N'admin', N'1', 1)
INSERT [dbo].[employee] ([empId], [name], [surname], [entranceDate], [number], [mail], [adress], [username], [password], [roleId]) VALUES (1001, N'Mehmet', N'Avdan', CAST(N'2017-07-20T00:00:00.000' AS DateTime), N'5059012312     ', N'mehmet@gmail.com', N'Mehmet Adress', N'mehmet', N'12312', 4)
INSERT [dbo].[employee] ([empId], [name], [surname], [entranceDate], [number], [mail], [adress], [username], [password], [roleId]) VALUES (1002, N'Burcu', N'Dağ', CAST(N'2017-07-20T00:00:00.000' AS DateTime), N'5059001122     ', N'burcudag@gmail.com', N'Burcu Adress', N'burcu', N'123465', 4)
INSERT [dbo].[employee] ([empId], [name], [surname], [entranceDate], [number], [mail], [adress], [username], [password], [roleId]) VALUES (1003, N'Kate', N'Glenn', CAST(N'2017-07-20T00:00:00.000' AS DateTime), N'5061122122     ', N'kateglenn@gmail.com', N'Kate Adress', N'kate', N'123465', 4)
SET IDENTITY_INSERT [dbo].[employee] OFF
SET IDENTITY_INSERT [dbo].[image] ON 

INSERT [dbo].[image] ([imageId], [image], [projectId], [description]) VALUES (1, N'1.jpg', 1, N'Resim 1')
INSERT [dbo].[image] ([imageId], [image], [projectId], [description]) VALUES (2, N'2.png', 1, N'Resim 2')
INSERT [dbo].[image] ([imageId], [image], [projectId], [description]) VALUES (3, N'3.jpg', 1, N'Resim 3')
INSERT [dbo].[image] ([imageId], [image], [projectId], [description]) VALUES (4, N'4.png', 1, N'Resim 4')
SET IDENTITY_INSERT [dbo].[image] OFF
SET IDENTITY_INSERT [dbo].[member] ON 

INSERT [dbo].[member] ([memberId], [name], [surname], [registerDay], [number], [mail], [adress], [identityNo], [username], [password], [roleId]) VALUES (1, N'Ozgur', N'Ozat', CAST(N'2017-07-20T00:00:00.000' AS DateTime), N'+905059051102 ', N'ozgur@gmail.com', N'Adres Ozgur', N'2131232231  ', N'ozgur', N'1', 2)
INSERT [dbo].[member] ([memberId], [name], [surname], [registerDay], [number], [mail], [adress], [identityNo], [username], [password], [roleId]) VALUES (2, N'Bulent', N'Avan', CAST(N'2017-07-20T00:00:00.000' AS DateTime), N'+905059051102 ', N'bulent@gmail.com', N'Adres Bulent', N'2312322123  ', N'bulent', N'1', 2)
INSERT [dbo].[member] ([memberId], [name], [surname], [registerDay], [number], [mail], [adress], [identityNo], [username], [password], [roleId]) VALUES (1004, N'Google', NULL, CAST(N'2017-07-25T12:10:53.740' AS DateTime), N'+905059051102 ', N'google@gmail.com', N'Adres Google ', NULL, N'go', N'1', 3)
INSERT [dbo].[member] ([memberId], [name], [surname], [registerDay], [number], [mail], [adress], [identityNo], [username], [password], [roleId]) VALUES (1005, N'Microsoft', NULL, CAST(N'2017-07-25T12:12:37.777' AS DateTime), N'+905059051102 ', N'microsoft@gmail.com', N'Adres Microsoft', NULL, N'microsoft', N'1', 3)
INSERT [dbo].[member] ([memberId], [name], [surname], [registerDay], [number], [mail], [adress], [identityNo], [username], [password], [roleId]) VALUES (1006, N'Apple', NULL, CAST(N'2017-07-25T12:24:25.003' AS DateTime), N'+905059051102 ', N'apple@gmail.com', N'Adres Apple', NULL, N'apple', N'1', 3)
INSERT [dbo].[member] ([memberId], [name], [surname], [registerDay], [number], [mail], [adress], [identityNo], [username], [password], [roleId]) VALUES (1007, N'Muhammed', N'Pak', CAST(N'2017-07-25T12:25:03.340' AS DateTime), N'+905059051102 ', N'mamipak@gmail.com', N'Address Büşra', N'1231232211  ', N'mami', N'1', 2)
INSERT [dbo].[member] ([memberId], [name], [surname], [registerDay], [number], [mail], [adress], [identityNo], [username], [password], [roleId]) VALUES (1008, N'Büşra', N'Karlı', CAST(N'2017-08-10T13:34:18.500' AS DateTime), N'+905059051102 ', N'busrakarli@gmail.com', N'631231 sk.50112', N'20811244139', N'busra', N'1', 2)
INSERT [dbo].[member] ([memberId], [name], [surname], [registerDay], [number], [mail], [adress], [identityNo], [username], [password], [roleId]) VALUES (1009, N'Josie Bishop', N'Wilkins', CAST(N'2017-09-09T19:52:08.160' AS DateTime), N'+905059051102 ', N'coh', N'fovos', N'81          ', N'Jeremy Newman', N'p@ssw0rd', 3)
INSERT [dbo].[member] ([memberId], [name], [surname], [registerDay], [number], [mail], [adress], [identityNo], [username], [password], [roleId]) VALUES (1010, N'Hande ', N'Çalışıcı', CAST(N'2017-09-17T02:10:00.587' AS DateTime), N'+905059051102 ', N'handecalisicii@outlook.com', N'adfasd', N'432534532452', N'hande', N'123456', 2)
SET IDENTITY_INSERT [dbo].[member] OFF
SET IDENTITY_INSERT [dbo].[project] ON 

INSERT [dbo].[project] ([projectId], [projectName], [description], [statuId], [memberId], [employeerId], [percentStatu], [startDate], [exceptedFinish], [finishDate], [saleId], [categoryId], [extra]) VALUES (1, N'Web Project', N'Web Project  Busra', 1, 1, 1000, 77, CAST(N'2017-09-20T00:00:00.000' AS DateTime), CAST(N'2018-07-30' AS Date), NULL, 3, 1, N'Web Proje ASP')
INSERT [dbo].[project] ([projectId], [projectName], [description], [statuId], [memberId], [employeerId], [percentStatu], [startDate], [exceptedFinish], [finishDate], [saleId], [categoryId], [extra]) VALUES (3, N'Order  Automation', N'Order  Automation to Food Company', 2, 2, 1001, 65, CAST(N'2017-07-21T00:00:00.000' AS DateTime), CAST(N'2018-07-31' AS Date), NULL, 6, 2, N'Desktop  C#')
INSERT [dbo].[project] ([projectId], [projectName], [description], [statuId], [memberId], [employeerId], [percentStatu], [startDate], [exceptedFinish], [finishDate], [saleId], [categoryId], [extra]) VALUES (1004, N'Bus Automation', N'Bus Automation to X Company', 1, 1004, 1002, 45, CAST(N'2017-07-16T00:00:00.000' AS DateTime), CAST(N'2018-06-15' AS Date), NULL, 10, 2, N'Desktop  Bus C#')
INSERT [dbo].[project] ([projectId], [projectName], [description], [statuId], [memberId], [employeerId], [percentStatu], [startDate], [exceptedFinish], [finishDate], [saleId], [categoryId], [extra]) VALUES (1005, N'Sales  Automation', N'Sales  Automation', 1, 1006, 1003, 40, CAST(N'2017-07-20T00:00:00.000' AS DateTime), CAST(N'2018-06-15' AS Date), NULL, 12, 2, N'Desktop  Sales C#')
INSERT [dbo].[project] ([projectId], [projectName], [description], [statuId], [memberId], [employeerId], [percentStatu], [startDate], [exceptedFinish], [finishDate], [saleId], [categoryId], [extra]) VALUES (1006, N'Seo Site', N'Seo Site for', 1, 1007, 1001, 70, CAST(N'2017-07-16T00:00:00.000' AS DateTime), CAST(N'2018-04-12' AS Date), NULL, 13, 7, N'Seo')
INSERT [dbo].[project] ([projectId], [projectName], [description], [statuId], [memberId], [employeerId], [percentStatu], [startDate], [exceptedFinish], [finishDate], [saleId], [categoryId], [extra]) VALUES (1008, N'Mobile Game', N'Mobile Game.Race ', 4, 1005, 1002, 100, CAST(N'2017-07-16T00:00:00.000' AS DateTime), NULL, CAST(N'2017-10-30T00:00:00.000' AS DateTime), 11, 3, N'Mobil Oyun race game to X company')
INSERT [dbo].[project] ([projectId], [projectName], [description], [statuId], [memberId], [employeerId], [percentStatu], [startDate], [exceptedFinish], [finishDate], [saleId], [categoryId], [extra]) VALUES (1020, N'Run Game', N'Run Game A', 1, 1004, 1001, 16, CAST(N'2017-08-20T00:00:00.000' AS DateTime), CAST(N'2018-06-12' AS Date), NULL, 14, 3, NULL)
INSERT [dbo].[project] ([projectId], [projectName], [description], [statuId], [memberId], [employeerId], [percentStatu], [startDate], [exceptedFinish], [finishDate], [saleId], [categoryId], [extra]) VALUES (1021, N'HHHHHHHHH', N'ggg', 1, 1004, 1000, 12, CAST(N'2017-08-13T00:00:00.000' AS DateTime), CAST(N'2017-08-20' AS Date), NULL, 15, 2, NULL)
INSERT [dbo].[project] ([projectId], [projectName], [description], [statuId], [memberId], [employeerId], [percentStatu], [startDate], [exceptedFinish], [finishDate], [saleId], [categoryId], [extra]) VALUES (1022, N'Ora Richards', N'pih', 1, 1009, 1001, 25, CAST(N'2017-09-02T00:00:00.000' AS DateTime), CAST(N'2017-09-30' AS Date), NULL, 16, 1, N'ilerouca')
INSERT [dbo].[project] ([projectId], [projectName], [description], [statuId], [memberId], [employeerId], [percentStatu], [startDate], [exceptedFinish], [finishDate], [saleId], [categoryId], [extra]) VALUES (1023, N'Jonathan Watson', N'giafe', 1, 1010, 1002, 0, CAST(N'2017-04-30T00:00:00.000' AS DateTime), CAST(N'2017-09-30' AS Date), NULL, 17, 2, N'eme')
SET IDENTITY_INSERT [dbo].[project] OFF
SET IDENTITY_INSERT [dbo].[role] ON 

INSERT [dbo].[role] ([roleId], [name]) VALUES (1, N'Admin')
INSERT [dbo].[role] ([roleId], [name]) VALUES (2, N'Uye')
INSERT [dbo].[role] ([roleId], [name]) VALUES (3, N'Sirket')
INSERT [dbo].[role] ([roleId], [name]) VALUES (4, N'Calisan')
SET IDENTITY_INSERT [dbo].[role] OFF
SET IDENTITY_INSERT [dbo].[sale] ON 

INSERT [dbo].[sale] ([saleId], [price], [hirepurchase], [IsPaidAll], [billId]) VALUES (3, 600.0000, 6, 0, 1)
INSERT [dbo].[sale] ([saleId], [price], [hirepurchase], [IsPaidAll], [billId]) VALUES (6, 400.0000, 4, 0, 2)
INSERT [dbo].[sale] ([saleId], [price], [hirepurchase], [IsPaidAll], [billId]) VALUES (10, 7000.0000, 10, 0, 1002)
INSERT [dbo].[sale] ([saleId], [price], [hirepurchase], [IsPaidAll], [billId]) VALUES (11, 200.0000, 5, 1, 1003)
INSERT [dbo].[sale] ([saleId], [price], [hirepurchase], [IsPaidAll], [billId]) VALUES (12, 500.0000, 5, 0, 1004)
INSERT [dbo].[sale] ([saleId], [price], [hirepurchase], [IsPaidAll], [billId]) VALUES (13, 900.0000, 12, 0, 1005)
INSERT [dbo].[sale] ([saleId], [price], [hirepurchase], [IsPaidAll], [billId]) VALUES (14, NULL, NULL, 0, 1010)
INSERT [dbo].[sale] ([saleId], [price], [hirepurchase], [IsPaidAll], [billId]) VALUES (15, NULL, NULL, 0, 1011)
INSERT [dbo].[sale] ([saleId], [price], [hirepurchase], [IsPaidAll], [billId]) VALUES (16, NULL, NULL, 0, 1012)
INSERT [dbo].[sale] ([saleId], [price], [hirepurchase], [IsPaidAll], [billId]) VALUES (17, 500.0000, 6, 0, 1013)
SET IDENTITY_INSERT [dbo].[sale] OFF
SET IDENTITY_INSERT [dbo].[statu] ON 

INSERT [dbo].[statu] ([statuId], [statuName]) VALUES (1, N'Devam Ediyor')
INSERT [dbo].[statu] ([statuId], [statuName]) VALUES (2, N'Iptal Oldu')
INSERT [dbo].[statu] ([statuId], [statuName]) VALUES (3, N'Durduruldu')
INSERT [dbo].[statu] ([statuId], [statuName]) VALUES (4, N'Bitti')
SET IDENTITY_INSERT [dbo].[statu] OFF
ALTER TABLE [dbo].[categoryValue]  WITH CHECK ADD  CONSTRAINT [FK_categoryValue_category] FOREIGN KEY([categoryId])
REFERENCES [dbo].[category] ([categoryId])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[categoryValue] CHECK CONSTRAINT [FK_categoryValue_category]
GO
ALTER TABLE [dbo].[categoryValueProject]  WITH CHECK ADD  CONSTRAINT [FK_categoryValueProject_categoryValue] FOREIGN KEY([categoryValueId])
REFERENCES [dbo].[categoryValue] ([categoryValueId])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[categoryValueProject] CHECK CONSTRAINT [FK_categoryValueProject_categoryValue]
GO
ALTER TABLE [dbo].[employee]  WITH CHECK ADD  CONSTRAINT [FK_employee_role] FOREIGN KEY([roleId])
REFERENCES [dbo].[role] ([roleId])
GO
ALTER TABLE [dbo].[employee] CHECK CONSTRAINT [FK_employee_role]
GO
ALTER TABLE [dbo].[member]  WITH CHECK ADD  CONSTRAINT [FK_member_role] FOREIGN KEY([roleId])
REFERENCES [dbo].[role] ([roleId])
GO
ALTER TABLE [dbo].[member] CHECK CONSTRAINT [FK_member_role]
GO
ALTER TABLE [dbo].[member]  WITH CHECK ADD  CONSTRAINT [FK_member_role1] FOREIGN KEY([roleId])
REFERENCES [dbo].[role] ([roleId])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[member] CHECK CONSTRAINT [FK_member_role1]
GO
ALTER TABLE [dbo].[project]  WITH CHECK ADD  CONSTRAINT [FK_project_category] FOREIGN KEY([categoryId])
REFERENCES [dbo].[category] ([categoryId])
ON UPDATE CASCADE
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[project] CHECK CONSTRAINT [FK_project_category]
GO
ALTER TABLE [dbo].[project]  WITH CHECK ADD  CONSTRAINT [FK_project_employee] FOREIGN KEY([employeerId])
REFERENCES [dbo].[employee] ([empId])
ON UPDATE CASCADE
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[project] CHECK CONSTRAINT [FK_project_employee]
GO
ALTER TABLE [dbo].[project]  WITH CHECK ADD  CONSTRAINT [FK_project_member] FOREIGN KEY([memberId])
REFERENCES [dbo].[member] ([memberId])
ON UPDATE CASCADE
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[project] CHECK CONSTRAINT [FK_project_member]
GO
ALTER TABLE [dbo].[project]  WITH CHECK ADD  CONSTRAINT [FK_project_sale] FOREIGN KEY([saleId])
REFERENCES [dbo].[sale] ([saleId])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[project] CHECK CONSTRAINT [FK_project_sale]
GO
ALTER TABLE [dbo].[project]  WITH CHECK ADD  CONSTRAINT [FK_project_statu] FOREIGN KEY([statuId])
REFERENCES [dbo].[statu] ([statuId])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[project] CHECK CONSTRAINT [FK_project_statu]
GO
ALTER TABLE [dbo].[sale]  WITH CHECK ADD  CONSTRAINT [FK_sale_bill] FOREIGN KEY([billId])
REFERENCES [dbo].[bill] ([billId])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[sale] CHECK CONSTRAINT [FK_sale_bill]
GO
USE [master]
GO
ALTER DATABASE [takip2] SET  READ_WRITE 
GO
